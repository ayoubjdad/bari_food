import React from "react";
import styles from "./Offers.module.scss";
import { useNavigate } from "react-router";
import { products } from "../../data/data";
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
  const navigate = useNavigate();

  const product = products.find((product) => product.id === id) || {};

  const {
    name = title,
    fileName,
    slug,
    description: { short = description } = {},
    price = footerText,
    pieces,
  } = product;

  const imageSrc = image || getProductImage(fileName);

  const onClick = () => {
    navigate(index === 2 ? "/contact" : `/produit/${id}/${slug}`);
  };

  return (
    <div
      onClick={onClick}
      className={`${styles.group} ${index === 1 && styles.middleGroup}`}
      style={
        index === 1
          ? {
              // backgroundImage: `url(${starburst})`,
              // backgroundPosition: "center",
            }
          : {}
      }
      key={index}
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
  );
};
