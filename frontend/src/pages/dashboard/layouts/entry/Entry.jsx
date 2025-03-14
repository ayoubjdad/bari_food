import React, { useState } from "react";
import styles from "./Entry.module.scss";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { serverUrl } from "../../../../config/config";
import { products } from "../../../../data/data";
import {
  displayErrorNotification,
  displaySuccessNotification,
} from "../../../../components/toast/success/SuccessToast";
import CustomTable from "../../../../components/custom-table/CustomTable";

// Constants
const columns = [
  { id: "elementNumber", label: "#", minWidth: 20 },
  { id: "name", label: "Elément", minWidth: 200, align: "left" },
  { id: "quantity", label: "Quantité", minWidth: 20, align: "left" },
  {
    id: "totalAmount",
    label: "Montant total (DH)",
    minWidth: 150,
    align: "right",
    format: (value) => value.toFixed(2), // Format the total amount
  },
];

// API Functions
const fetchDeliveryNotes = async (date) => {
  try {
    const response = await axios.get(`${serverUrl}/api/deliveryNotes`);
    const filteredOnSites = response?.data?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return filteredOnSites;
  } catch (error) {
    console.error("❌ Error fetching delivery notes:", error);
    throw new Error("Failed to fetch delivery notes");
  }
};

// Form Component
const FormBC = () => {
  const queryClient = useQueryClient();
  const defaultValue = { name: "", price: "", totalAmount: "", quantity: 1 };
  const productsList = products.map(({ name, price }) => ({ name, price }));
  const [selectedProduct, setSelectedProduct] = useState(defaultValue);

  const handleProductChange = (_, newValue) => {
    setSelectedProduct(
      newValue
        ? { ...newValue, quantity: 1, totalAmount: newValue.price }
        : defaultValue
    );
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    setSelectedProduct({
      ...selectedProduct,
      quantity: value,
      totalAmount: selectedProduct.price * value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${serverUrl}/api/deliveryNotes`,
        selectedProduct
      );
      if (response.status === 201) {
        queryClient.setQueryData(["deliveryNotes"], (oldData) => [
          ...oldData,
          { ...selectedProduct, _id: Date.now() }, // Add a temporary ID for rendering
        ]);
        displaySuccessNotification("Bon de livraison confirmé");
        setSelectedProduct(defaultValue);
      }
    } catch (error) {
      displayErrorNotification(
        "Erreur lors de la soumission du bon de livraison"
      );
      console.error(
        "❌ Erreur lors de la soumission du bon de livraison:",
        error
      );
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Ajouter un bon de livraison</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Autocomplete
          style={{ width: "40%" }}
          options={productsList}
          getOptionLabel={(option) => option.name}
          value={selectedProduct}
          onChange={handleProductChange}
          renderInput={(params) => (
            <TextField {...params} placeholder="Produit" />
          )}
        />
        <TextField
          placeholder="Quantité"
          name="quantity"
          type="number"
          value={selectedProduct.quantity}
          onChange={handleQuantityChange}
        />
        <TextField
          placeholder="Prix"
          name="totalAmount"
          type="number"
          value={selectedProduct.totalAmount}
          InputProps={{ readOnly: true }}
        />
        <Button type="submit">Ajouter</Button>
      </form>
    </div>
  );
};

// Main Component
export default function Entry() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const {
    data: deliveryNotes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["deliveryNotes"],
    queryFn: fetchDeliveryNotes,
  });

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  // Transform data for the table
  const tableData = deliveryNotes.map((note, index) => ({
    ...note,
    elementNumber: index + 1 + page * rowsPerPage, // Add row numbers
  }));

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <FormBC deliveryNotes={deliveryNotes} />
        <CustomTable
          page={page}
          data={tableData}
          columns={columns}
          isError={isError}
          isLoading={isLoading}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </section>
  );
}
