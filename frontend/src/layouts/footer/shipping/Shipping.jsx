import React from "react";
import styles from "./Shipping.module.scss";

const items = [
  {
    icon: "free-delivery",
    alias: "Livraison gratuite",
    description: "Nous livrons des marchandises dans le monde entier",
  },
  {
    icon: "shield-check",
    alias: "Meilleure qualité",
    description: "Nous sommes une chaîne internationale de restaurants.",
  },
  {
    icon: "store-alt",
    alias: "Notre magasin",
    description: "Vous pouvez voir nos produits « ici et maintenant »",
  },
  {
    icon: "shipping-fast",
    alias: "Livraison rapide",
    description: "Nous livrons des marchandises dans le monde entier",
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
