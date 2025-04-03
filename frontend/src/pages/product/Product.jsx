import React, { useState } from "react";
import styles from "./Product.module.scss";
import Divider from "@mui/material/Divider";
import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Products from "../../layouts/products/Products";
import { useLocation } from "react-router";
import { useCart } from "../../context/cart/CartContext";
import { displaySuccessNotification } from "../../components/toast/success/SuccessToast";
import { categories } from "../../data/data";
import { getProductImage } from "../../helpers/functions.helper";

export default function Product() {
  const { addToCart } = useCart();
  const location = useLocation();
  const product = location.state || {};

  const {
    id,
    categoryId,
    name,
    fileName,
    description: { long } = {},
    price,
  } = product;

  const [options, setOptions] = useState({
    quantity: 1,
  });

  const { name: category, slug = "" } =
    categories.find((category) => category.id === categoryId) || {};
  const imageSrc = getProductImage(slug, fileName);

  if (!id) {
    return (
      <section className={styles.main} key={id}>
        <div className={styles.container}>
          <p>No product data available!</p>
        </div>
      </section>
    );
  }

  const changeQuantity = (type) => {
    if (type === "minus") {
      if (options.quantity > 1) {
        setOptions({ ...options, quantity: options.quantity - 1 });
      }
    }

    if (type === "plus") {
      setOptions({ ...options, quantity: options.quantity + 1 });
    }
  };

  const handleTypeChange = (event) => {
    setOptions({ ...options, type: event.target.value });
  };

  const handleAddToCart = () => {
    if (categoryId === 4) {
      alert("Veuillez sélectionner une taille avant d'ajouter au panier.");
      return;
    }

    try {
      const quantity = options.quantity;
      addToCart(product, quantity);
      displaySuccessNotification();
    } catch (error) {
      console.error("❌", error);
    }
  };

  return (
    <section className={styles.main} key={id}>
      <div className={styles.container}>
        <div className={styles.product}>
          <div className={styles.images}>
            <img src={imageSrc} alt={name} />
          </div>

          <div className={styles.infos}>
            <Chip label="En stock" color="primary" />
            <p className={styles.title}>{name}</p>
            {long ? <p className={styles.description}>{long}</p> : null}
            <p className={styles.price}>{price} Dh</p>
            <Divider />
            <div className={styles.cart}>
              <div className={styles.quantity}>
                <Box
                  component="i"
                  className="fi fi-rr-minus"
                  onClick={() => changeQuantity("minus")}
                />
                {options.quantity}
                <Box
                  component="i"
                  className="fi fi-rr-plus"
                  onClick={() => changeQuantity("plus")}
                />
              </div>
              <Button
                startIcon={<i className="fi fi-rr-shopping-cart-add" />}
                style={{ width: "100%" }}
                onClick={handleAddToCart}
              >
                Ajouter au panier
              </Button>
            </div>
            <Divider />
            <div>
              <p>
                Categorie :{" "}
                <span className={styles.description}>{category}</span>
              </p>
            </div>

            {categoryId === 4 && (
              <>
                <Divider />

                <div className={styles.sizeSelector}>
                  {!options.type && (
                    <p className={styles.error}>
                      Veuillez sélectionner le type*
                    </p>
                  )}

                  <div className={styles.sizeSelector}>
                    <RadioGroup
                      row
                      value={options.type}
                      onChange={handleTypeChange}
                    >
                      <FormControlLabel
                        value="Cuite"
                        control={<Radio />}
                        label="Cuite"
                      />
                      <FormControlLabel
                        value="Surgelée"
                        control={<Radio />}
                        label="Surgelée"
                      />
                    </RadioGroup>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <h1>Autres produits</h1>
        <Products products={[]} />
      </div>
    </section>
  );
}
