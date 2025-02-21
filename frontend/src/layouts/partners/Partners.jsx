import React from "react";
import styles from "./Partners.module.scss";

const items = [
  {
    alias: "Joy Food",
    image: "https://joyfood.ma/wp-content/themes/JOYFOOD-theme/imgs/logo.png",
  },
  {
    alias: "Joy Food",
    image: "https://joyfood.ma/wp-content/themes/JOYFOOD-theme/imgs/logo.png",
  },
  {
    alias: "Joy Food",
    image: "https://joyfood.ma/wp-content/themes/JOYFOOD-theme/imgs/logo.png",
  },
];

export default function Partners() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Nos partenaires</h1>
        </div>

        <div className={styles.items}>
          {items.map(({ image, alias, description }) => (
            <div className={styles.item}>
              <img src={image} alt={alias} />
              <p className={styles.alias}>{alias}</p>
              <p className={styles.description}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
