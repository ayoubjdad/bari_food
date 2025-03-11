import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Orders.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  MenuItem,
  Modal,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import { products } from "../../../../data/data";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { serverUrl } from "../../../../config/config";

const columns = [
  { id: "orderNumber", label: "#" },
  {
    id: "date",
    label: "Date",
    align: "left",
  },
  {
    id: "items",
    label: "Eléments",
    align: "left",
  },
  {
    id: "totalAmount",
    label: "Montant total (DH)",
    align: "left",
  },
];

const getOnSites = async (date) => {
  try {
    const response = await axios.get(`${serverUrl}/api/onSites/date/${date}`);
    const filteredOrders = response?.data?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return filteredOrders || [];
  } catch (error) {
    console.error("❌", error);
    return [];
  }
};

export default function Orders() {
  const dateRef = useRef(null);

  const [page, setPage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState();
  const [ordersData, setOrdersData] = useState([{ title: "Total", value: 0 }]);

  const {
    data: onSites,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["onSite"],
    queryFn: () => getOnSites(selectedDate),
  });

  const filtredRows = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return onSites?.filter((row) => row.date.includes(selectedDate || today));
  }, [selectedDate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateClick = (newValue) => {
    if (dateRef.current) {
      dateRef.current.focus(); // Met le focus sur l'input
      dateRef.current.showPicker?.(); // Force l'ouverture du date picker (Chrome, Edge)
    }
  };

  useEffect(() => {
    if (onSites) {
      setOrdersData([{ title: "Total", value: onSites.length }]);
    }
  }, [onSites]);

  return (
    <>
      <OrdersPopover onClose={handleClose} anchorEl={anchorEl} />

      <section className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Button
              startIcon={<i className="fi fi-rr-plus" />}
              onClick={handleClick}
            >
              Ajouter une commande
            </Button>
          </div>

          <div className={styles.orders}>
            <p className={styles.today}>
              <TextField
                type="date"
                inputRef={dateRef}
                defaultValue={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ display: "none" }}
              />
              <Box component="i" className="fi fi-rr-calendar" />
              <span onClick={handleDateClick}>
                {selectedDate || "Aujourd'hui"}
              </span>
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
                  {columns.map((column, index) => {
                    if (column.id === "items") {
                      return null;
                    }

                    return (
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
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {filtredRows
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          if (column.id === "items") {
                            return null;
                          }

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                              {column.id === "totalAmount" ? " DH" : ""}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination & Rows per page control */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Box display="flex" alignItems="center">
              <p style={{ color: "#808080" }}>Items per page</p>
              <Select
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                sx={{
                  marginLeft: "8px",
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  "& .MuiSelect-select": {
                    padding: "6px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    padding: 0,
                    borderRadius: "8px",
                    border: "1px solid #e5e5e5",
                  },
                }}
              >
                {[10, 20, 50].map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Pagination
              count={Math.ceil(filtredRows?.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Box>
        </div>
      </section>
    </>
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

const OrdersPopover = ({ anchorEl, onClose }) => {
  const open = Boolean(anchorEl);
  const productsList = products.map(({ name, price }) => ({
    label: name,
    price,
  }));

  const [orderData, setOrderData] = useState({
    product: null,
    quantity: 1,
    price: "",
  });

  // Mise à jour des valeurs du formulaire
  const handleProductChange = (event, newValue) => {
    if (newValue) {
      setOrderData({
        ...orderData,
        product: newValue,
        price: newValue.price, // Mettre à jour le prix automatiquement
      });
    } else {
      setOrderData({ ...orderData, product: null, price: "" });
    }
  };

  const handleQuantityChange = (e) => {
    setOrderData({
      ...orderData,
      quantity: e.target.value,
      price: Number(e.target.value) * orderData.product.price,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
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
            {/* Champ de sélection du produit */}
            <Autocomplete
              options={productsList}
              getOptionLabel={(option) => option.label}
              value={orderData.product}
              onChange={handleProductChange}
              renderInput={(params) => (
                <TextField {...params} label="Produit" required />
              )}
            />

            {/* Champ de quantité */}
            <TextField
              label="Quantité"
              name="quantity"
              type="number"
              value={orderData.quantity}
              onChange={handleQuantityChange}
              required
            />

            {/* Champ de prix (readonly) */}
            <TextField
              label="Prix"
              name="price"
              type="number"
              value={orderData.price}
              InputProps={{ readOnly: true }} // Rend le champ non modifiable
            />

            <div className={styles.buttonContainer}>
              <Button variant="contained" color="secondary" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Ajouter
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
