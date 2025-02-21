import React, { useState, useEffect } from "react";
import styles from "./Categories.module.scss";
import { categories } from "../../data/data";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@mui/material";

export default function Categories() {
  const [index, setIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  // Detect screen size and adjust items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(7);
      }
    };

    updateItemsPerPage(); // Initial call
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const nextSlide = () => {
    const newIndex = index + itemsPerPage;
    if (newIndex >= categories.length) {
      setIndex(0);
    } else {
      setIndex(newIndex);
    }
  };

  return (
    <section className={styles.main}>
      <div className={styles.container}>
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
            className={styles.categories}
          >
            {categories
              .slice(index, index + itemsPerPage)
              .map(({ image, name, slug }) => (
                <Link to={`/produits/${slug}`} key={slug}>
                  <div className={styles.category}>
                    <div className={styles.image}>
                      <img src={image} alt={name} />
                    </div>
                    <p className={styles.name}>{name}</p>
                  </div>
                </Link>
              ))}
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
    </section>
  );
}
