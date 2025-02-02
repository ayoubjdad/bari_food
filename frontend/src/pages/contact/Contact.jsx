import React from "react";
import styles from "./Contact.module.scss";
import PageHeader from "../../components/page-header/PageHeader";
import { Box, Button, TextField } from "@mui/material";

const Info = ({ title, icon, description }) => (
  <div className={styles.info}>
    <Box component="i" className={icon} />
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
);

export default function Contact() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <PageHeader title="Contact" />

        <div className={styles.header}>
          <h1>Appelez-nous ou visitez nos locaux</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <div className={styles.contact}>
          <Info
            title="Téléphone"
            icon="fi fi-rr-phone-call"
            description="+ 44 123 456 78 90"
          />
          <Info
            title="Adresse"
            icon="fi fi-rr-land-layer-location"
            description="Box 565, Pinney's Beach, Charlestown, Nevis, Antilles, Caraïbes"
          />
          <Info
            title="E-mail"
            icon="fi fi-rr-envelope"
            description="info@exemple.com"
          />
        </div>

        <div className={styles.contactFormContainer}>
          <div className={styles.map}>
            <img
              src="https://fr.casablancamap360.com/img/1200/plan-attractions-casablanca.jpg"
              alt="map"
            />
          </div>
          <div className={styles.contactForm}>
            <h1>Envoyez-nous un message</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <form className={styles.form}>
              <TextField placeholder="Nom" name="name" />
              <TextField placeholder="Email" name="email" />
              <TextField
                placeholder="Message"
                name="message"
                multiline
                rows={4}
              />
              <Button
                type="submit"
                style={{
                  width: "100%",
                }}
              >
                Envoyer
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
