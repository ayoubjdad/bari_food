import React, { useMemo } from "react";
import styles from "./TopReceips.module.scss";
import ProductLarge from "../../components/product-large/ProductLarge";
import { products } from "../../data/data";
import delivery from "../../assets/images/way-concept-illustration.png";

export default function TopReceips() {
  const list = useMemo(
    () => products.filter((product) => product.name.includes("Pain Libanais")),
    [products]
  );

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.receipsContainer}>
          <div className={styles.header}>
            <h1>Pain Libanais</h1>
            <p>
              <span>Voir tout</span>
              <i class="fi fi-rr-arrow-small-right"></i>
            </p>
          </div>

          <div className={styles.receips}>
            {list.slice(0, 6).map((product) => (
              <ProductLarge product={product} />
            ))}
          </div>
        </div>

        <div className={styles.delivery}>
          <div className={styles.deliveryTitle}>
            <p className={styles.top}>Bari vous livre</p>
            <p className={styles.middle}>à Casablanca</p>
            <p className={styles.bottom}>Appelez-nous sur</p>
            <p className={styles.phone}>06 06 060 606</p>
          </div>
          <div className={styles.deliveryImage}>
            <img src={delivery} alt="delivery" />
          </div>
        </div>
      </div>
    </section>
  );
}
