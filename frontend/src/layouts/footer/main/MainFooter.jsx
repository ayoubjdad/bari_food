import React from "react";
import styles from "./MainFooter.module.scss";
import { Box, Link } from "@mui/material";
import logo from "../../../assets/logo/bari-logo-green.png";

const social = [
  {
    title: "Facebook",
    link: "www.facebook.com/barifoodmaroc",
    icon: "fi fi-brands-facebook",
  },
  {
    title: "Instagram",
    link: "www.instagram.com/barifoodmaroc",
    icon: "fi fi-brands-instagram",
  },
  {
    title: "Tik Tok",
    link: "www.tiktok.com/barifoodmaroc",
    icon: "fi fi-brands-tik-tok",
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
            description="Casablanca, Maroc, 20250"
          />
          <Container
            index={1}
            title="Horaires d'ouverture"
            description="Lundi – vendredi : 8h – 20h"
            footerText="Samedi – Dimanche : 9h – 20h"
          />
          <Container
            index={2}
            title="Contact"
            description="contact@bari-food.com"
            footerText="Tél : +212 664 27 35 23"
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
            <Link to="/" key={title}>
              <Box component="i" className={icon} title={title} />
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  </div>
);
