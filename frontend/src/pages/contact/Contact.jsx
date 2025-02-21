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
          <h1>Contactez-nous ou passez nous voir</h1>
          <p>
            Nous sommes ravis de vous accueillir et de répondre à toutes vos
            questions.
          </p>
        </div>

        <div className={styles.contact}>
          <Info
            title="Téléphone"
            icon="fi fi-rr-phone-call"
            description="+212 678 123 456"
          />
          <Info
            title="Adresse"
            icon="fi fi-rr-land-layer-location"
            description="Bd de la Liberté, Casablanca 20250"
          />
          <Info
            title="E-mail"
            icon="fi fi-rr-envelope"
            description="info@barifood.com"
          />
        </div>

        <div className={styles.contactFormContainer}>
          <div className={styles.map}>
            <img
              src="https://fr.casablancamap360.com/img/1200/plan-attractions-casablanca.jpg"
              alt="Carte de Casablanca"
            />
          </div>
          <div className={styles.contactForm}>
            <h1>Envoyez-nous un message</h1>
            <p>
              Une question, une demande ou une suggestion ? Écrivez-nous et nous
              vous répondrons dans les plus brefs délais.
            </p>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <TextField placeholder="Nom" name="name" />
              <TextField placeholder="Email" name="email" />
              <TextField
                placeholder="Message"
                name="message"
                multiline
                rows={4}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: 0,
                    borderRadius: "24px",
                  },
                }}
              />
              <Button type="submit" style={{ width: "100%" }}>
                Envoyer
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
