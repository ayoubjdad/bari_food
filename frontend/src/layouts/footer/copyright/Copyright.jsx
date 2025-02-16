import React from "react";
import styles from "./Copyright.module.scss";

export default function Copyright() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <p>Copyright © 2025 Bari Food. Tout droit réservé.</p>
        <p>
          Concéption & réalisation <b>RGI Studio</b>
        </p>
      </div>
    </section>
  );
}
