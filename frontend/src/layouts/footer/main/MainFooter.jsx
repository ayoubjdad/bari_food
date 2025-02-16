import React from "react";
import styles from "./MainFooter.module.scss";
import { Box } from "@mui/material";
import logo from "../../../assets/logo/bari-logo-green.png";

const social = [
  {
    title: "Facebook",
    icon: "fi fi-brands-facebook",
  },
  {
    title: "Instagram",
    icon: "fi fi-brands-instagram",
  },
  {
    title: "Tik Tok",
    icon: "fi fi-brands-tik-tok",
  },
  {
    title: "Whatsapp",
    icon: "fi fi-brands-whatsapp",
  },
  {
    title: "Linkedin",
    icon: "fi fi-brands-linkedin",
  },
];

export default function MainFooter() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <div />
          <img src={logo} alt="logo" className={styles.logo} />
          <div />
        </div>

        <div className={styles.elements}>
          <Container
            index={0}
            title="Adresse"
            description="570 8th Ave, New York, NY 10018 United States"
          />
          <Container
            index={1}
            title="Horaires d'ouverture"
            description="Lundi – vendredi : 8h – 16h"
            footerText="Samedi : 9h – 17h"
          />
          <Container
            index={2}
            title="Contact"
            description="contact@bari.com"
            footerText="Tél : +212 660 606 606"
          />
          <Container
            index={3}
            title="Réseaux sociaux"
            description="Rejoignez-nous sur les réseaux sociaux"
          />
        </div>
      </div>
    </section>
  );
}

const Container = ({ index, title, description, footerText }) => (
  <div className={styles.element} key={index}>
    <h2>{title}</h2>

    <div className={styles.elementParagraphs}>
      <p>{description}</p>
      <p>{footerText}</p>
      {index === 3 ? (
        <div className={styles.social}>
          {social.map(({ title, icon }) => (
            <Box component="i" className={icon} title={title} />
          ))}
        </div>
      ) : null}
    </div>
  </div>
);
