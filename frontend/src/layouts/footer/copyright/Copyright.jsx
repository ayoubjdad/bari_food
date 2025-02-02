import React from "react";
import styles from "./Copyright.module.scss";

export default function Copyright() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <p>Copyright © 2022 Bari Food. All Rights Reserved.</p>
        <img
          src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/footer_img1.png"
          alt=""
        />
      </div>
    </section>
  );
}
