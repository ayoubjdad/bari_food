import React from "react";
import styles from "./Partners.module.scss";

const items = [
  {
    alias: "Assylor",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWZm3GlYnVJ60tmiBTgjS9mCcVsarcOUFXXA&s",
  },
  {
    alias: "Joy Food",
    image: "https://joyfood.ma/wp-content/themes/JOYFOOD-theme/imgs/logo.png",
  },
  {
    alias: "Bridor",
    image:
      "https://www.bridor.com/medias/sys_master/images/h74/hd4/8797219061790/LogoBridor2C/LogoBridor2C.svg",
  },
  {
    alias: "Pain d'or",
    image: "https://joyfood.ma/wp-content/uploads/2024/12/04.png",
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
          {items.map(({ image, alias }) => (
            <div className={styles.item}>
              <div
                className={styles.itemImage}
                style={{
                  color: alias === "Bridor" && "white",
                  backgroundColor: alias === "Bridor" && "rgb(0, 3, 15)",
                }}
              >
                <img src={image} alt={alias} />
              </div>
              <p className={styles.alias}>{alias}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
