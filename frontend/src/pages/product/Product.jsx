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

  const handleSizeChange = (event) => {
    setOptions({ ...options, size: event.target.value });
  };

  const handleAddToCart = () => {
    try {
      addToCart(product, options?.quantity);
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
            <p className={styles.description}>{long}</p>
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
                  <RadioGroup
                    row
                    value={options.size}
                    onChange={handleSizeChange}
                  >
                    <FormControlLabel
                      value="minis"
                      control={<Radio />}
                      label="Minis (8)"
                    />
                    <FormControlLabel
                      value="grands"
                      control={<Radio />}
                      label="Grands (4)"
                    />
                  </RadioGroup>
                </div>
              </>
            )}

            <div className={styles.checkout}>
              <p>Paiement sécurisé garanti</p>
              <img
                src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/trust-symbols.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <h1>Autres produits</h1>
        <Products products={[]} />
      </div>
    </section>
  );
}
