import React from "react";
import styles from "./ProductLarge.module.scss";
import { useCart } from "../../context/cart/CartContext";
import { Box } from "@mui/material";
import { Link } from "react-router";

export default function ProductLarge({ product = {} }) {
  const { addToCart } = useCart();

  const { id, name, slug, price } = product;

  return (
    <Link to={`/produit/${id}/${slug}`} state={product}>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.productImage}>
            <img
              className={styles.productImage}
              src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/40-1-150x150.png"
              alt={name}
            />
          </div>
          <div className={styles.productCaption}>
            <p className={styles.productTitle}>{name}</p>

            <p className={styles.productDescription}>{name}</p>
            <div className={styles.productFooter}>
              <p className={styles.productPrice}>{price} DH</p>
              <Box
                component="i"
                onClick={() => addToCart(product)}
                className={`fi fi-rr-shopping-cart-add ${styles.productCart}`}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
