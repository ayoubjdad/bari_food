import React from "react";
import styles from "./Product.module.scss";
import { useCart } from "../../context/cart/CartContext";
import { Box } from "@mui/material";
import { Link } from "react-router";
import { displaySuccessNotification } from "../toast/success/SuccessToast";
import { getProductImage } from "../../helpers/functions.helper";
import { categories } from "../../data/data";

export default function Product({ product = {} }) {
  const { addToCart } = useCart();

  const {
    id,
    name,
    fileName,
    slug,
    description: { short } = {},
    price,
    categoryId,
  } = product;
  const { slug: categorySlug = "" } =
    categories.find((category) => category.id === categoryId) || {};
  const imageSrc = getProductImage(categorySlug, fileName);

  const handleAddToCart = (e) => {
    e?.preventDefault();

    try {
      addToCart(product, categoryId !== 4 ? 1 : 4);
      displaySuccessNotification("Ajouté à la carte");
    } catch (error) {
      console.error("❌", error);
    }
  };

  return (
    <div className={styles.container}>
      <Link to={`/produit/${id}/${slug}`} state={product}>
        <div className={styles.productImage}>
          {/* {isNew ? <p className={styles.onsale}>Nouveau!</p> : null} */}
          <img src={imageSrc} alt={name} />
        </div>
        <div className={styles.productCaption}>
          <p className={styles.productTitle}>{name}</p>

          <p className={styles.productDescription}>{short}</p>
          <div className={styles.productFooter}>
            <p className={styles.productPrice}>{price} DH</p>
            {categoryId === 4 ? null : (
              <Box
                component="i"
                onClick={handleAddToCart}
                className={`fi fi-rr-shopping-cart-add ${styles.productCart}`}
              />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
