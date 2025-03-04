import React from "react";
import styles from "./Home.module.scss";
import Offers from "../../layouts/offers/Offers";
import Products from "../../layouts/products/Products";
import Categories from "../../layouts/categories/Categories";
import MainSlide from "../../layouts/slides/main-slide/MainSlide";
import TopReceips from "../../layouts/top-receips/TopReceips";
import Newsletter from "../../layouts/newsletter/Newsletter";
import Partners from "../../layouts/partners/Partners";
import GetOurApps from "../../layouts/get-our-app/GetOurApps";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <MainSlide />
        <Categories />
        <Offers />
        <Products />
        <GetOurApps />
        <TopReceips />
        <Partners />
        <Newsletter />
      </div>
    </div>
  );
}
