import React from "react";
import styles from "./HeaderTop.module.scss";

export default function HeaderTop() {
  return (
    <header className={styles.main}>
      <div className={styles.container}>
        🚀 Soyez parmi les 200 livrés par jour & profitez de nos offres
        exclusives et de la livraison rapide !
      </div>
    </header>
  );
}
