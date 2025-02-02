import React from "react";
import styles from "./MainSlide.module.scss";
import Button from "@mui/material/Button";

export default function MainSlide() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.text}>
          <h1>UNLIMITED MEDIUM PIZZAS</h1>
          <p>Order now and get a free pizza delivery</p>
          <div className={styles.textFooter}>
            <Button>Order now</Button>
            <p>$12.99</p>
          </div>
        </div>
        <div className={styles.image}>
          <img
            src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/h1_pizza.png"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
