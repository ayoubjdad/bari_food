import React from "react";
import styles from "./MainSlide.module.scss";
import Button from "@mui/material/Button";
import mainSlide from "../../../assets/images/main-slide.jpg";

export default function MainSlide() {
  return (
    <section
      className={styles.main}
      style={{ backgroundImage: `url(${mainSlide})` }}
    >
      <div className={styles.container}>
        <div className={styles.text}>
          <h1>Croissant Arty 75g</h1>
          <p>
            Une nouvelle forme originale, moderne et pyramidale qui offre un
            feuilletage extérieur fin et délicat avec des feuillets bien marqués
            et une mie soyeuse.
          </p>
          <div className={styles.textFooter}>
            <Button>Commande maintenant</Button>
            <p>
              4.5 Dh<span> /10 pièces</span>
            </p>
          </div>
        </div>
        {/* <div className={styles.image}>
          <img
            src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/h1_pizza.png"
            alt=""
          />
        </div> */}
      </div>
    </section>
  );
}
