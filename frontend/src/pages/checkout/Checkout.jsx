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

const Checkout = () => {
  const { cart } = useCart();
  const { user } = useLogin();

  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <PageHeader title="Checkout" />

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
            {cart.map((product) => (
              <div className={styles.element} key={product.id}>
                <p>
                  {product.name} x {product.quantity}
                </p>

                <p>{product.price * product.quantity} DH</p>
              </div>
            ))}
            <Divider />
            <div className={styles.element}>
              <b>Total</b>
              <b>{totalPrice} DH</b>
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
            <p>
              Vos données personnelles seront utilisées pour traiter votre
              commande, soutenir votre expérience sur ce site Web et à d'autres
              fins décrites dans notre politique de confidentialité .
            </p>

            <Button type="submit" style={{ width: "100%" }}>
              Passer la commande
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
