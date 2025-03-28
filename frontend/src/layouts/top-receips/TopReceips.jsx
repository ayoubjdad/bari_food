import React, { useMemo } from "react";
import styles from "./TopReceips.module.scss";
import ProductLarge from "../../components/product-large/ProductLarge";
import delivery from "../../assets/images/way-concept-illustration.png";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../helpers/apis/apis.helpers";

export default function TopReceips() {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

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
            <p className={styles.middle}>
              à Casablanca, Mohammedia, Rabat, Temara, Salé, Berrchid, Bouskoura
            </p>
            <p className={styles.bottom}>Whatsapp</p>
            <p className={styles.phone}>+212 664 27 35 23</p>
          </div>
          <div className={styles.deliveryImage}>
            <img src={delivery} alt="delivery" />
          </div>
        </div>
      </div>
    </section>
  );
}
