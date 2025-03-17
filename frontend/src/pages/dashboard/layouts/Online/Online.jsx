import React, { useEffect, useRef, useState } from "react";
import styles from "./Online.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Divider } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { serverUrl } from "../../../../config/config";
import {
  getOrdersByDate,
  getProducts,
} from "../../../../helpers/apis/apis.helpers";
import { formatTime } from "../../../../helpers/functions.helper";

const columns = [
  { id: "orderNumber", label: "#", minWidth: 20 },
  { id: "customer", label: "Client", minWidth: 200 },
  { id: "items", label: "Eléments", minWidth: 200 },
  { id: "itemsCount", label: "Quantité", minWidth: 15, align: "left" },
  { id: "status", label: "Statut", minWidth: 120 },
  { id: "address", label: "Adresse", minWidth: 120, align: "left" },
  { id: "phone", label: "Téléphone", minWidth: 120, align: "left" },
  { id: "time", label: "Heure", minWidth: 120, align: "left" },
  {
    id: "totalAmount",
    label: "Montant total (DH)",
    minWidth: 120,
    align: "right",
  },
  { id: "actions", label: "Actions", minWidth: 150, align: "right" },
];

export default function Online() {
  const dateInputRef = useRef(null);
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [ordersData, setOrdersData] = useState([
    { title: "Total", value: 0 },
    { title: "Livrés", value: 0 },
    { title: "En attente", value: 0 },
    { title: "Annulés", value: 0 },
  ]);
  const [date, setDate] = useState(
    "2025-03-14"
    // "new Date().toISOString().split("T")[0]
  );

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", date],
    queryFn: () => getOrdersByDate(date),
  });

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSpanClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // Pour les navigateurs modernes
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case "Pending":
        return "En attente";
      case "Delivered":
        return "Livré";
      case "Cancelled":
        return "Annulé";
      default:
        return "Inconnu";
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const orderIndex = orders?.findIndex((order) => order._id === orderId);

      if (orderIndex !== -1) {
        const data = {
          ...orders[orderIndex],
          shippingAddress: {
            ...orders[orderIndex]?.shippingAddress,
            phone: orders[orderIndex]?.shippingAddress?.phone || "N/A",
          },
          status: newStatus,
        };

        const ids = data?.items?.map((item) => ({
          id: Number(item.product),
          quantity: item.quantity,
        }));

        const productsToEdit = products.filter((product) =>
          ids.some((obj) => obj.id === product.id)
        );

        productsToEdit.forEach((product) => {
          const index = ids.findIndex((obj) => obj.id === product.id);
          product.countInStock -= ids[index].quantity;

          axios.put(`${serverUrl}/api/products/${product._id}`, product);
        });

        await axios.put(`${serverUrl}/api/orders/${orderId}`, data);
        queryClient.invalidateQueries(["orders"]);
      }
    } catch (error) {
      console.error("❌", error);
    }
  };

  const onChangeDate = (e) => {
    const date = e.target.value;
    setDate(date);
  };

  useEffect(() => {
    if (orders) {
      setOrdersData([
        { title: "Total", value: orders.length },
        {
          title: "Livrés",
          value: orders.filter((order) => order.status === "Delivered").length,
        },
        {
          title: "En attente",
          value: orders.filter((order) => order.status === "Pending").length,
        },
        {
          title: "Annulés",
          value: orders.filter((order) => order.status === "Cancelled").length,
        },
      ]);
    }
  }, [orders]);

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.orders}>
          <p className={styles.today}>
            <Box component="i" className="fi fi-rr-calendar" />
            <span onClick={handleSpanClick} style={{ cursor: "pointer" }}>
              {date}
            </span>
            <input
              type="date"
              ref={dateInputRef}
              style={{ display: "none" }}
              onChange={onChangeDate}
            />
          </p>
          <Divider orientation="vertical" flexItem />
          {ordersData.map(({ title, value }, index) => (
            <>
              <Item title={title} value={value} />
              {index !== ordersData.length - 1 ? (
                <Divider orientation="vertical" flexItem />
              ) : null}
            </>
          ))}
        </div>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      borderRadius:
                        index === 0
                          ? "12px 0 0 12px"
                          : index === columns.length - 1
                          ? "0 12px 12px 0"
                          : 0,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Chargement...
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Erreur lors du chargement des commandes.
                  </TableCell>
                </TableRow>
              ) : (
                orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order, index) => (
                    <TableRow hover key={order._id}>
                      {columns.slice(0, columns.length - 1).map((column) => {
                        let value;

                        switch (column.id) {
                          case "orderNumber":
                            value = index + 1 + page * rowsPerPage;
                            break;
                          case "customer":
                            value =
                              order.user?.name ||
                              order.shippingAddress?.fullName ||
                              "Inconnu";
                            break;
                          case "items":
                            value = order.items.map(
                              (item) =>
                                products.find(
                                  (product) =>
                                    String(product.id) === String(item.product)
                                )?.name
                            );
                            break;
                          case "status":
                            value = formatStatus(order.status);
                            break;
                          case "address":
                            value = order.shippingAddress?.address || "N/A";
                            break;
                          case "phone":
                            value = order.shippingAddress?.phone || "N/A";
                            break;
                          case "time":
                            value = formatTime(order.createdAt) || "N/A";
                            break;
                          case "itemsCount":
                            value = order.items.map((item) => item.quantity);
                            break;
                          case "totalAmount":
                            value = order.totalAmount.toFixed(2);
                            break;
                          default:
                            value = "";
                        }

                        let style = {};
                        if (column.id === "status") {
                          style = {
                            width: "fit-content",
                            padding: "2px 10px",
                            borderRadius: "80px",
                            border: "1px solid",
                            backgroundColor:
                              value === "En attente"
                                ? "#fff5cc"
                                : value === "Livré"
                                ? "#d3fcd2"
                                : value === "Annulé"
                                ? "#ffe9d5"
                                : "transparent",
                            color:
                              value === "En attente"
                                ? "#7a4100"
                                : value === "Livré"
                                ? "#065e49"
                                : value === "Annulé"
                                ? "#7a0916"
                                : "inherit",
                            borderColor:
                              value === "En attente"
                                ? "#7a4100"
                                : value === "Livré"
                                ? "#065e49"
                                : value === "Annulé"
                                ? "#7a0916"
                                : "transparent",
                          };
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            <p style={column.id === "status" ? style : {}}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : column.id === "items" ||
                                  column.id === "itemsCount"
                                ? value.map((element) => <p>{element}</p>)
                                : value}
                            </p>
                          </TableCell>
                        );
                      })}

                      <TableCell align="right">
                        {formatStatus(order.status) !== "En attente" ? null : (
                          <div className={styles.actions}>
                            <Box
                              component="i"
                              className={`fi fi-rr-check ${styles.check}`}
                              onClick={() =>
                                updateOrderStatus(order._id, "Delivered")
                              }
                            />
                            <Box
                              component="i"
                              className={`fi fi-rr-cross ${styles.cross}`}
                              onClick={() =>
                                updateOrderStatus(order._id, "Cancelled")
                              }
                            />
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={orders?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </section>
  );
}

const Item = ({ title, value }) => {
  return (
    <div className={styles.item}>
      <p className={styles.title}>{title}</p>
      <p className={styles.value}>{value}</p>
    </div>
  );
};
