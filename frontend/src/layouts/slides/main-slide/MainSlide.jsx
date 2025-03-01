import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./MainSlide.module.scss";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { categories, products } from "../../../data/data";
import { getProductImage } from "../../../helpers/functions.helper";
import { useNavigate } from "react-router-dom"; // Fix: Use "react-router-dom" instead of "react-router"

export default function MainSlide() {
  const navigate = useNavigate();

  const intervalTime = 5000;

  const [index, setIndex] = useState(0);

  const slides = useMemo(() => {
    const filteredProducts = products.filter(
      (product) => product.isHighlighted
    );
    const result = filteredProducts.map((product) => {
      const { slug } = categories.find(
        (category) => category.id === product.categoryId
      );
      return {
        ...product,
        image: getProductImage(slug, product.fileName),
      };
    });

    return result;
  }, [products]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const buyNow = () => {
    navigate(`/produit/${slides[index].id}/${slides[index].slug}`, {
      state: { ...slides[index] },
    });
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
                <Button onClick={buyNow}>Commande maintenant</Button>
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
