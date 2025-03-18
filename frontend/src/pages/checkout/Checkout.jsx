import React, { useState } from "react";
import styles from "./Checkout.module.scss";
import PageHeader from "../../components/page-header/PageHeader";
import {
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useCart } from "../../context/cart/CartContext";
import { useLogin } from "../../context/login/LoginContext";
import {
  displayErrorNotification,
  displayInProgressNotification,
  displaySuccessNotification,
} from "../../components/toast/success/SuccessToast";
import { serverUrl } from "../../config/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getOrders = async () => {
  try {
    const response = await axios.get(`${serverUrl}/api/orders`);
    return response?.data || [];
  } catch (error) {
    console.error("❌", error);
    return [];
  }
};

const Checkout = () => {
  const { cart, setCart } = useCart();
  const { user, logged } = useLogin();

  const { data: allOrders } = useQuery({
    queryKey: ["allOrders"],
    queryFn: getOrders,
  });

  const hasDiscount =
    allOrders?.findIndex((order) => order?.user?.email === user?.email) === -1;

  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (totalPrice < 200) {
      alert("Le montant minimum de commande est de 200 DH.");
      return;
    }

    displayInProgressNotification("Commande en cours de traitement...");

    const orderData = {
      user: user?._id,
      items: cart.map((product) => ({
        product: String(product.id),
        quantity: product.quantity,
        price: product.price,
      })),
      totalAmount: hasDiscount ? totalPrice - totalPrice * 0.1 : totalPrice,
      paymentMethod: formData.paymentMethod || "Cash on Delivery",
      shippingAddress: {
        fullName: formData.fullName,
        address: formData.address,
        phone: formData.phone,
        city: formData.city,
      },
    };

    try {
      const response = await fetch(`${serverUrl}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      displaySuccessNotification("Commande confirmée");
      setFormData({});
      setCart([]);
    } catch (error) {
      displayErrorNotification("Erreur lors de la soumission de la commande");
      console.error("Error submitting order:", error);
    }
  };

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <PageHeader title="Paiement" />

        <form className={styles.info} onSubmit={handleSubmit}>
          <div className={styles.group}>
            <h1>Détails de facturation</h1>
            <TextField
              placeholder="Nom"
              name="fullName"
              fullWidth
              required
              defaultValue={formData.fullName}
              onChange={handleChange}
              disabled={logged}
            />
            <TextField
              placeholder="Téléphone"
              name="phone"
              type="tel"
              fullWidth
              required
              onChange={handleChange}
            />
            <TextField
              placeholder="E-mail"
              name="email"
              type="email"
              fullWidth
              defaultValue={formData.email}
              onChange={handleChange}
              disabled={logged}
            />
            <TextField
              placeholder="Adresse"
              name="address"
              fullWidth
              required
              onChange={handleChange}
            />
            <TextField
              placeholder="Ville"
              name="city"
              fullWidth
              required
              onChange={handleChange}
            />
          </div>

          <div className={`${styles.group} ${styles.recap}`}>
            <h1>Votre commande</h1>

            <div className={styles.element}>
              <b>Produits</b>
              <b>Total</b>
            </div>

            <Divider />
            {cart?.length ? (
              cart.map((product) => (
                <>
                  <div className={styles.element} key={product.id}>
                    <p>
                      {product.name} x {product.quantity}
                    </p>

                    <p>{product.price * product.quantity} DH</p>
                  </div>
                  <Divider />
                </>
              ))
            ) : (
              <>
                <p>Aucun produit dans votre panier</p>
                <Divider />
              </>
            )}

            {logged && hasDiscount ? (
              <>
                <div className={styles.element}>
                  <b>Réduction -10%</b>
                  <b>-{(totalPrice * 0.1).toFixed(2)} DH</b>
                </div>
                <Divider />
              </>
            ) : null}

            <div className={styles.element}>
              <b>Total</b>
              <b>{totalPrice - totalPrice * 0.1} DH</b>
            </div>
            <Divider />
            <RadioGroup
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <FormControlLabel
                value="COD"
                control={<Radio checked />}
                label="Paiement à la livraison"
              />
              <FormControlLabel
                disabled
                value="bankTransfer"
                control={<Radio />}
                label="Carte banquaire (Sera disponible prochainement)"
              />
            </RadioGroup>
            <p>🚚 Les commandes passées avant 19h seront livrés dans 24h</p>
            <p>⚠️ Les commandes passées après 19h seront livrés dans 48h</p>

            <Button
              disabled={!cart?.length}
              type="submit"
              style={{ width: "100%" }}
            >
              Passer la commande
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
