import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./MainSlide.module.scss";
import Button from "@mui/material/Button";
import mainSlide from "../../../assets/images/main-slide.jpg";
import { Box } from "@mui/material";
import { products } from "../../../data/data";
import { getProductImage } from "../../../helpers/functions.helper";

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
  const intervalTime = 5000;
  const [index, setIndex] = useState(0);

  const slides = useMemo(() => {
    const filteredProducts = products.filter(
      (product) => product.isHighlighted
    );

    return filteredProducts.map((product) => ({
      image: getProductImage(product.fileName),
      name: product.name,
      description: product.description,
      price: product.price,
    }));
  }, [products]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.slideContainer}>
          <div className={styles.arrowLeft}>
            <Box
              component="i"
              className="fi fi-rr-arrow-small-left"
              onClick={nextSlide}
            />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.1 }}
              className={styles.slide}
            >
              <div className={styles.text}>
                <h1>{slides[index].name}</h1>
                <p>{slides[index].description.short}</p>
                <p className={styles.price}>{slides[index].price} DH</p>
                <Button onClick={nextSlide}>Commande maintenant</Button>
              </div>

              <div className={styles.productImage}>
                <img src={slides[index].image} alt={slides[index].name} />
              </div>
            </motion.div>
          </AnimatePresence>
          <div className={styles.arrowRight}>
            <Box
              component="i"
              className="fi fi-rr-arrow-small-right"
              onClick={nextSlide}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
