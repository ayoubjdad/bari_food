import React from "react";
import styles from "./TopReceips.module.scss";
import ProductLarge from "../../components/product-large/ProductLarge";
import { products } from "../../data/data";

export default function TopReceips() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.receipsContainer}>
          <div className={styles.header}>
            <h1>Top Receips</h1>
            <p>Voir tout</p>
          </div>

          <div className={styles.receips}>
            {products.slice(0, 6).map((product) => (
              <ProductLarge product={product} />
            ))}
          </div>
        </div>

        <div className={styles.delivery}>
          <p>Livraison rapide</p>
          <p>CHICKEN</p>
          <p>Livraison rapide</p>
        </div>
      </div>
    </section>
  );
}
