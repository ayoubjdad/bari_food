import React from "react";
import styles from "./Stock.module.scss";
import { categories } from "../../../../data/data";
import { getProductImage } from "../../../../helpers/functions.helper";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../../helpers/apis/apis.helpers";

export default function Stock() {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.products}>
          {products.map((product) => (
            <Product product={product} products={products} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Product = ({ product, products = [] }) => {
  const { id, name, countInStock } = product;

  const productIndex = products.findIndex((product) => product.id === id);
  const { categoryId, fileName } = products?.[productIndex] || {};

  const { slug: categorySlug = "" } =
    categories.find((category) => category.id === categoryId) || {};

  const imageSrc = getProductImage(categorySlug, fileName);

  return (
    <div className={styles.product}>
      <div className={styles.productImage}>
        <img src={imageSrc} alt={name} />
      </div>
      <div className={styles.details}>
        <h3>{name}</h3>
        <p>{countInStock}</p>
      </div>
    </div>
  );
};
