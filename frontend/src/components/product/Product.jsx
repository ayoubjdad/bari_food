import React from "react";
import styles from "./Product.module.scss";
import { useCart } from "../../context/cart/CartContext";
import { Box } from "@mui/material";
import { Link } from "react-router";
import { displaySuccessNotification } from "../toast/success/SuccessToast";

export default function Product({ product = {} }) {
  const { addToCart } = useCart();

  const { id, name, slug, description: { short } = {}, price } = product;

  const handleAddToCart = (e) => {
    e?.preventDefault();

    try {
      addToCart(product);
      displaySuccessNotification("Ajouté à la carte");
    } catch (error) {
      console.error("❌", error);
    }
  };

  return (
    <div className={styles.container}>
      <Link to={`/produit/${id}/${slug}`} state={product}>
        <div className={styles.productImage}>
          {/* <p className={styles.onsale}>Sale!</p> */}
          <img
            className={styles.productImage}
            src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/40-1-150x150.png"
            alt={name}
          />
        </div>
        <div className={styles.productCaption}>
          {/* <div className={styles.rate}>
            <i className="fi fi-sr-star" />
            <i className="fi fi-sr-star" />
            <i className="fi fi-sr-star" />
            <i className="fi fi-sr-star" />
            <i className="fi fi-sr-star" />
          </div> */}

          <p className={styles.productTitle}>{name}</p>

          <p className={styles.productDescription}>{short}</p>
          <div className={styles.productFooter}>
            <p className={styles.productPrice}>{price} DH</p>
            <Box
              component="i"
              onClick={handleAddToCart}
              className={`fi fi-rr-shopping-cart-add ${styles.productCart}`}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
