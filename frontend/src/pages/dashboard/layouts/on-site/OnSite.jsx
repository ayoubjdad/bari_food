import React, { useEffect, useRef, useState } from "react";
import styles from "./OnSite.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Modal,
  TextField,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { serverUrl } from "../../../../config/config";
import { products } from "../../../../data/data";
import {
  displayErrorNotification,
  displaySuccessNotification,
} from "../../../../components/toast/success/SuccessToast";

const columns = [
  { id: "onSiteNumber", label: "#", minWidth: 20 },
  { id: "items", label: "Eléments", minWidth: 20, align: "left" },
  {
    id: "totalAmount",
    label: "Montant total (DH)",
    minWidth: 150,
    align: "right",
  },
];
const getOnSites = async (date) => {
  try {
    const response = await axios.get(`${serverUrl}/api/onSites/date/${date}`);
    const filteredOnSites = response?.data?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return filteredOnSites;
  } catch (error) {
    console.error("❌", error);
    return [];
  }
};

export default function OnSite() {
  const dateInputRef = useRef(null);
  const queryClient = useQueryClient();

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const {
    data: onSites,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["onSites"],
    queryFn: () => getOnSites(date),
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

  const updateOnSiteStatus = async (onSiteId, newStatus) => {
    try {
      const onSiteIndex = onSites?.findIndex(
        (onSite) => onSite._id === onSiteId
      );

      if (onSiteIndex) {
        await axios.put(`${serverUrl}/api/onSites/${onSiteId}`, {
          ...onSites[onSiteIndex],
          shippingAddress: {
            ...onSites[onSiteIndex]?.shippingAddress,
            phone: onSites[onSiteIndex]?.shippingAddress?.phone || "N/A",
          },
          status: newStatus,
        });
        queryClient.invalidateQueries(["onSites"]);
      }
    } catch (error) {
      console.error("❌", error);
    }
  };

  const [onSitesData, setOnSitesData] = useState([
    { title: "Total", value: 0 },
  ]);

  useEffect(() => {
    if (onSites) {
      setOnSitesData([{ title: "Total", value: onSites.length }]);
    }
  }, [onSites]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <OrdersPopover
            onClose={handleClose}
            anchorEl={anchorEl}
            onSites={onSites}
          />

          <Button
            startIcon={<i className="fi fi-rr-plus" />}
            onClick={handleClick}
          >
            Ajouter une commande
          </Button>
        </div>

        <div className={styles.onSites}>
          <p className={styles.today}>
            <Box component="i" className="fi fi-rr-calendar" />
            <span onClick={handleSpanClick} style={{ cursor: "pointer" }}>
              Aujourd'hui
            </span>
            <input type="date" ref={dateInputRef} style={{ display: "none" }} />
          </p>
          <Divider orientation="vertical" flexItem />
          {onSitesData.map(({ title, value }, index) => (
            <>
              <Item title={title} value={value} />
              {index !== onSitesData.length - 1 ? (
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
                      bonSiteRadius:
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
                onSites
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((onSite, index) => (
                    <TableRow hover key={onSite._id}>
                      {columns.slice(0, columns.length - 1).map((column) => {
                        let value;

                        switch (column.id) {
                          case "onSiteNumber":
                            value = index + 1 + page * rowsPerPage;
                            break;
                          case "customer":
                            value =
                              onSite.user?.name ||
                              onSite.shippingAddress?.fullName ||
                              "Inconnu";
                            break;
                          case "status":
                            value = formatStatus(onSite.status);
                            break;
                          case "address":
                            value = onSite.shippingAddress?.address || "N/A";
                            break;
                          case "phone":
                            value = onSite.shippingAddress?.phone || "N/A";
                            break;
                          case "itemsCount":
                            value = onSite.items.length;
                            break;
                          case "totalAmount":
                            value = onSite.totalAmount.toFixed(2);
                            break;
                          default:
                            value = "";
                        }

                        let style = {};
                        if (column.id === "status") {
                          style = {
                            width: "fit-content",
                            padding: "2px 10px",
                            bonSiteRadius: "80px",
                            bonSite: "1px solid",
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
                            bonSiteColor:
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
                        {formatStatus(onSite.status) !== "En attente" ? null : (
                          <div className={styles.actions}>
                            <Box
                              component="i"
                              className={`fi fi-rr-check ${styles.check}`}
                              onClick={() =>
                                updateOnSiteStatus(onSite._id, "Delivered")
                              }
                            />
                            <Box
                              component="i"
                              className={`fi fi-rr-cross ${styles.cross}`}
                              onClick={() =>
                                updateOnSiteStatus(onSite._id, "Cancelled")
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
          count={onSites?.length || 0}
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

const OrdersPopover = ({ anchorEl, onClose, onSites }) => {
  const open = Boolean(anchorEl);
  const productsList = products.map(({ name, price }) => ({
    label: name,
    price,
  }));

  const [orderItems, setOrderItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    product: null,
    quantity: 1,
    price: "",
  });

  const handleProductChange = (event, newValue) => {
    console.log(":::::: ~ newValue:", newValue);
    if (newValue) {
      setCurrentItem({
        ...currentItem,
        product: newValue.label,
        price: newValue.price,
      });
    } else {
      setCurrentItem({ product: null, quantity: 1, price: "" });
    }
  };

  const handleQuantityChange = (e) => {
    setCurrentItem({
      ...currentItem,
      quantity: Number(e.target.value),
      price:
        Number(e.target.value) *
        (currentItem.product ? currentItem.product.price : 0),
    });
  };

  const handleAddItem = () => {
    if (currentItem.product && currentItem.quantity > 0) {
      setOrderItems([...orderItems, currentItem]);
      setCurrentItem({ product: null, quantity: 1, price: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let totalPrice = 0;
    orderItems.forEach(
      ({ quantity, price }) => (totalPrice += Number(quantity) * Number(price))
    );

    const newOrder = {
      items: [...orderItems],
      totalAmount: totalPrice,
    };

    try {
      const response = await fetch(`${serverUrl}/api/onSites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      displaySuccessNotification("Commande confirmée");
      setOrderItems([]);
      setCurrentItem({ product: null, quantity: 1, price: "" });
      onClose();
    } catch (error) {
      displayErrorNotification("Erreur lors de la soumission de la commande");
      console.error("❌ Error submitting order:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        setOrderItems([]);
        setCurrentItem({ product: null, quantity: 1, price: "" });
      }}
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Ajouter une commande</h2>
            <Box
              component="i"
              className="fi fi-rr-cross"
              onClick={onClose}
              style={{ cursor: "pointer" }}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <Autocomplete
              options={productsList}
              getOptionLabel={(option) => option.label}
              value={currentItem.product}
              onChange={handleProductChange}
              renderInput={(params) => (
                <TextField {...params} label="Produit" />
              )}
            />

            <div style={{ display: "flex", gap: "12px" }}>
              <TextField
                label="Quantité"
                name="quantity"
                type="number"
                value={currentItem.quantity}
                onChange={handleQuantityChange}
              />

              <TextField
                label="Prix"
                name="price"
                type="number"
                value={currentItem.price}
                InputProps={{ readOnly: true }}
              />
            </div>

            <Button onClick={handleAddItem}>Ajouter</Button>

            <ul className={styles.list}>
              {orderItems.map((item, index) => (
                <li key={index}>
                  {item.product.label} - {item.quantity} x {item.product.price}{" "}
                  DH = {item.price} DH
                </li>
              ))}
            </ul>

            <div className={styles.buttonContainer}>
              <Button
                style={{
                  color: "#0a5440",
                  backgroundColor: "white",
                  border: "1px solid #0a5440",
                }}
                onClick={onClose}
              >
                Annuler
              </Button>
              <Button type="submit">Valider la commande</Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
