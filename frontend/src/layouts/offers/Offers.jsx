import React from "react";
import styles from "./Offers.module.scss";
import starburst from "../../assets/images/starburst.jpg";
import { useNavigate } from "react-router";

export default function Offers() {
  const navigate = useNavigate();

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <Container
          index={0}
          title="Pain aux Céréales"
          description="new phenomenon burger taste"
          footerText="25DH / 10pièces"
          image="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/09/h1_banner1-1.png"
        />
        <Container
          index={1}
          title="Croissant au Beurre"
          description="Save room we made salats"
          footerText="12DH"
          image="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/09/h1_banner2-2.png"
        />
        <Container
          index={2}
          title="Le magasin le plus proche de chez vous"
          description="Trouver un magasin"
          image="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/09/h1_banner3.png"
          onClick={() => navigate("/contact")}
        />
      </div>
    </section>
  );
}

const Container = ({
  index,
  title,
  description,
  footerText,
  image,
  onClick,
}) => {
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
        {title ? <p className={styles.title}>{title}</p> : null}
        {description ? (
          <p className={styles.description}>{description}</p>
        ) : null}
        {footerText ? <p className={styles.footerText}>{footerText}</p> : null}
      </div>
      <div className={styles.image}>
        <img src={image} alt={image} />
      </div>
    </div>
  );
};
