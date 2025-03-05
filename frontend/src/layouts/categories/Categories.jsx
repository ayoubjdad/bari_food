import React from "react";
import styles from "./Categories.module.scss";
import { categories } from "../../data/data";
import { Link } from "react-router";
import { getCategoryImage } from "../../helpers/functions.helper";

export default function Categories() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.categories}>
          {categories.map(({ id, name, slug }) => {
            const imageSrc = getCategoryImage(slug);

            return (
              <Link id={id} to={`/produits/${slug}`} key={slug}>
                <div className={styles.category}>
                  <div className={styles.image}>
                    <img src={imageSrc} alt={name} />
                  </div>
                  <p className={styles.name}>{name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
