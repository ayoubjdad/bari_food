import React, { useState } from "react";
import styles from "./Online.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Divider } from "@mui/material";
import { serverUrl } from "../../config/config";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const columns = [
  { id: "orderNumber", label: "#", minWidth: 20 },
  { id: "customer", label: "Client", minWidth: 200 },
  { id: "status", label: "Statut", minWidth: 120 },
  { id: "address", label: "Adresse", minWidth: 170, align: "left" },
  { id: "phone", label: "Téléphone", minWidth: 120, align: "left" },
  { id: "itemsCount", label: "Quantité", minWidth: 20, align: "left" },
  {
    id: "totalAmount",
    label: "Montant total (DH)",
    minWidth: 150,
    align: "right",
  },
  { id: "actions", label: "Actions", minWidth: 150, align: "right" },
];

const getOrders = async () => {
  const response = await axios.get(`${serverUrl}/api/orders`);
  return response.data;
};

export default function Online() {
  const queryClient = useQueryClient();

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
      const orderIndex = orders?.findIndex(
        (order) => order.orderId === orderId
      );

      if (orderIndex) {
        await axios.put(`${serverUrl}/api/orders/${orderId}`, {
          ...orders[orderIndex],
          status: newStatus,
        });
        queryClient.invalidateQueries(["orders"]);
      }
    } catch (error) {
      console.error("❌", error);
    }
  };

  const ordersData = [
    {
      title: "Aujourd'hui",
      value: "48",
    },
    {
      title: "Livrés",
      value: "493",
    },
    {
      title: "En attente",
      value: "359",
    },
    {
      title: "Annulés",
      value: "6",
    },
  ];

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.orders}>
          <p className={styles.today}>
            <Box component="i" className="fi fi-rr-calendar" />
            <span>Aujourd'hui</span>
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
                            value = order.user?.name || "Inconnu";
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
                          case "itemsCount":
                            value = order.items.length;
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
