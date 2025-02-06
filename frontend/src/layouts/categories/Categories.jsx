import React from "react";
import styles from "./Categories.module.scss";
import { categories } from "../../data/data";
import { Link } from "react-router";

export default function Categories() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        {categories.map(({ image, name, slug }) => (
          <Link to={`/produits/${slug}`}>
            <div className={styles.category}>
              <div className={styles.image}>
                <img src={image} alt={name} />
              </div>
              <p className={styles.name}>{name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
