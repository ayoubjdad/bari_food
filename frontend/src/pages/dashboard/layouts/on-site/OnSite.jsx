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
  Typography,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { serverUrl } from "../../../../config/config";
import { products } from "../../../../data/data";
import {
  displayErrorNotification,
  displaySuccessNotification,
} from "../../../../components/toast/success/SuccessToast";
import { getOnSitesByDate } from "../../../../helpers/apis/apis.helpers";

const columns = [
  { id: "onSiteNumber", label: "#", minWidth: 20 },
  { id: "items", label: "Eléments", minWidth: 200, align: "left" },
  { id: "itemsCount", label: "Quantité", minWidth: 20, align: "left" },
  {
    id: "totalAmount",
    label: "Montant total (DH)",
    minWidth: 150,
    align: "right",
  },
];

export default function OnSite() {
  const dateInputRef = useRef(null);

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const {
    data: onSites,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["onSites", date],
    queryFn: () => getOnSitesByDate(date),
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

  const onChangeDate = (e) => {
    const date = e.target.value;
    setDate(date);
  };

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <OrdersPopover
            date={date}
            onClose={handleClose}
            anchorEl={anchorEl}
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
                      {columns.map((column) => {
                        let value;

                        switch (column.id) {
                          case "onSiteNumber":
                            value = index + 1 + page * rowsPerPage;
                            break;
                          case "items":
                            value = onSite.items.map(
                              (item) =>
                                products.find(
                                  (product) =>
                                    String(product.id) === String(item.product)
                                )?.name
                            );
                            break;
                          case "itemsCount":
                            value = onSite.items.map((item) => item.quantity);
                            break;
                          case "totalAmount":
                            value = onSite.totalAmount.toFixed(2);
                            break;
                          default:
                            value = "";
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            <p>
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

const OrdersPopover = ({ anchorEl, onClose, date }) => {
  const queryClient = useQueryClient();

  const open = Boolean(anchorEl);
  const productsList = products.map(({ id, name, price }) => ({
    id,
    label: name,
    price,
  }));

  const [orderItems, setOrderItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    label: "",
    product: "",
    quantity: 1,
    price: 0,
  });

  const handleProductChange = (event, newValue) => {
    if (newValue) {
      setCurrentItem({
        ...currentItem,
        label: newValue.label,
        product: newValue.id,
        price: newValue.price,
      });
    } else {
      setCurrentItem({ label: "", product: "", quantity: 1, price: 0 });
    }
  };

  const handleQuantityChange = (e) => {
    const quantity = Number(e.target.value);

    setCurrentItem((current) => {
      const unitPrice = products.find((p) => p.id === current.product)?.price;

      return {
        ...currentItem,
        quantity,
        price: quantity * unitPrice,
      };
    });
  };

  const handleAddItem = () => {
    if (currentItem.product && currentItem.quantity > 0) {
      setOrderItems([...orderItems, currentItem]);
      setCurrentItem({ label: "", product: "", quantity: 1, price: 0 });
    } else {
      displayErrorNotification(
        "Veuillez sélectionner un produit et une quantité valide."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalPrice = orderItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    const newOrder = {
      items: orderItems,
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

      queryClient.invalidateQueries(["onSites", date]);
      displaySuccessNotification("Commande confirmée");
      setOrderItems([]);
      setCurrentItem({ product: null, quantity: 1, price: 0 });
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
        setCurrentItem({ product: null, quantity: 1, price: 0 });
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
              value={currentItem}
              onChange={handleProductChange}
              renderInput={(params) => (
                <TextField {...params} placeholder="Produit" fullWidth />
              )}
            />

            <div className={styles.inputGroup}>
              <TextField
                label="Quantité"
                name="quantity"
                type="number"
                value={currentItem.quantity}
                onChange={handleQuantityChange}
                fullWidth
              />
              <TextField
                label="Prix"
                name="price"
                type="number"
                value={currentItem.price}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </div>
            <div className={styles.buttonContainer}>
              <Button onClick={handleAddItem}>Ajouter</Button>
            </div>

            <ul className={styles.orderList}>
              {orderItems.map((item, index) => (
                <li key={index}>
                  <Typography>
                    {item.label} ({item.quantity}) :{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {item.quantity * item.price} DH
                    </span>
                  </Typography>
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
                fullWidth
              >
                Annuler
              </Button>
              <Button type="submit" fullWidth>
                Valider la commande
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
