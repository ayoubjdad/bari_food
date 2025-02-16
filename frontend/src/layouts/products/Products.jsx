import React from "react";
import styles from "./Products.module.scss";
import Product from "../../components/product/Product";
import { products } from "../../data/data";
import Button from "@mui/material/Button";
import { Link } from "react-router";

export default function Products() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.products}>
          {products.slice(0, 8).map((product) => (
            <Product product={product} />
          ))}
        </div>

        <Link to="/produits">
          <Button>Tout les produits</Button>
        </Link>
      </div>
    </section>
  );
}
