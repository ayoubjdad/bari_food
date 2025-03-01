import React from "react";
import styles from "./Offers.module.scss";
import { Link } from "react-router";
import { categories, products } from "../../data/data";
import { getProductImage } from "../../helpers/functions.helper";

export default function Offers() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <Container id={21} index={0} />
        <Container id={22} index={1} />
        <Container
          index={2}
          title="Le magasin le plus proche de chez vous"
          description="Trouver un magasin"
          image="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/09/h1_banner3.png"
        />
      </div>
    </section>
  );
}

const Container = ({ id, index, title, description, footerText, image }) => {
  const product = products.find((product) => product.id === id) || {};

  const {
    name = title,
    fileName,
    slug,
    description: { short = description } = {},
    price = footerText,
    categoryId,
  } = product;
  const { slug: categorySlug } =
    categories.find((category) => category.id === categoryId) || {};
  const imageSrc =
    image ||
    require(`../../assets/images/products/${categorySlug}/${fileName}.JPG`);

  return (
    <Link to={`/produit/${id}/${slug}`} state={product}>
      <div
        key={index}
        className={`${styles.group} ${index === 1 && styles.middleGroup}`}
      >
        <div className={styles.text}>
          {name ? <p className={styles.title}>{name}</p> : null}
          {short ? <p className={styles.description}>{short}</p> : null}
          {price ? <p className={styles.footerText}>{price}</p> : null}
        </div>
        <div className={styles.image}>
          <img src={imageSrc} alt={imageSrc} />
        </div>
      </div>
    </Link>
  );
};
