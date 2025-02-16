import React from "react";
import styles from "./Shipping.module.scss";

const items = [
  {
    icon: "free-delivery",
    alias: "Livraison gratuite*",
    description: "Livraison gratuite partout au Maroc.",
  },
  {
    icon: "shield-check",
    alias: "Meilleure qualité",
    description: "Des produits de qualité supérieure pour nos clients.",
  },
  {
    icon: "store-alt",
    alias: "Notre magasin",
    description: "Découvrez nos produits en magasin ou en ligne.",
  },
  {
    icon: "shipping-fast",
    alias: "Livraison rapide",
    description: "Livraison rapide et fiable partout au Maroc.",
  },
];

export default function Shipping() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        {items.map(({ icon, alias, description }) => (
          <div className={styles.item}>
            <div className={styles.icon}>
              <i className={`fi fi-rr-${icon}`} />
            </div>
            <p className={styles.alias}>{alias}</p>
            <p className={styles.description}>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
