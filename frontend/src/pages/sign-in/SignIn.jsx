import React from "react";
import styles from "./SignIn.module.scss";
import PageHeader from "../../components/page-header/PageHeader";
import { Button, TextField } from "@mui/material";

export default function SignIn() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <PageHeader title="Inscription" />

        <div className={styles.formContainer}>
          <form>
            <TextField
              type="email"
              placeholder="Email"
              style={{ width: "100%" }}
            />
            <TextField placeholder="Nom complet" style={{ width: "100%" }} />
            <TextField placeholder="Téléphone" style={{ width: "100%" }} />
            <TextField
              type="password"
              placeholder="Mot de passe"
              style={{ width: "100%" }}
            />
            <TextField
              type="password"
              placeholder="Répétez votre mot de passe"
              style={{ width: "100%" }}
            />
            <Button style={{ width: "100%" }}>Inscription</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
