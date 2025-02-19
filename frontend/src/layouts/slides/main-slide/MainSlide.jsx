import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./MainSlide.module.scss";
import Button from "@mui/material/Button";
import mainSlide from "../../../assets/images/main-slide.jpg";
import { Box } from "@mui/material";

const slides = [
  {
    image: mainSlide,
    title: "Croissant Arty 75g",
    description: "Une nouvelle forme originale, moderne et pyramidale",
    price: "4.5 Dh /10 pièces",
  },
  {
    image: mainSlide,
    title: "Pain au Chocolat 80g",
    description: "Délicieux et croustillant avec du chocolat fondant",
    price: "5 Dh /10 pièces",
  },
  {
    image: mainSlide,
    title: "Brioche Moelleuse 100g",
    description: "Une texture moelleuse avec un goût irrésistible",
    price: "6 Dh /10 pièces",
  },
];

export default function MainSlide() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className={styles.main}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className={styles.container}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.1 }}
          style={{ backgroundImage: `url(${slides[index].image})` }}
        >
          <div className={styles.arrowLeft}>
            <Box
              component="i"
              className="fi fi-rr-arrow-small-left"
              onClick={nextSlide}
            />
          </div>
          <div className={styles.text}>
            <h1>{slides[index].title}</h1>
            <p>{slides[index].description}</p>
            <p className={styles.price}>{slides[index].price}</p>
            <Button onClick={nextSlide}>Commande maintenant</Button>
          </div>
          <div className={styles.arrowRight}>
            <Box
              component="i"
              className="fi fi-rr-arrow-small-right"
              onClick={nextSlide}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
