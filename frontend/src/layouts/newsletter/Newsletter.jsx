import React from "react";
import styles from "./Newsletter.module.scss";
import { Button, TextField } from "@mui/material";

export default function Newsletter() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Newsletter</h1>
          <p>
            Entrez votre email et recevez 10% de réduction sur votre prochaine
            commande!
          </p>
        </div>
        <div className={styles.form}>
          <TextField placeholder="Addresse email" />
          <Button style={{ height: "43px" }}>Subscribe</Button>
        </div>
      </div>
    </section>
  );
}
