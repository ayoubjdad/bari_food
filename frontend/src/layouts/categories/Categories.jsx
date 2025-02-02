import React from "react";
import styles from "./Categories.module.scss";
import { categories } from "../../data/data";

export default function Categories() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        {categories.map(({ image, name }) => (
          <div className={styles.category}>
            <div className={styles.image}>
              <img src={image} alt={name} />
            </div>
            <p className={styles.name}>{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
