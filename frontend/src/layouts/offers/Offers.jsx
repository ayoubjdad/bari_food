import React from "react";
import styles from "./Offers.module.scss";

export default function Offers() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <Container
          index={0}
          title="Any day offers"
          description="new phenomenon burger taste"
          footerText="$12.90"
          image="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/09/h1_banner1-1.png"
        />
        <Container
          index={1}
          title="Other flavors"
          description="Save room we made salats"
          footerText="$12.90"
          image="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/09/h1_banner2-2.png"
        />
        <Container
          index={2}
          title="Find a Poco store near you"
          footerText="Contact us"
          image="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/09/h1_banner3.png"
        />
      </div>
    </section>
  );
}

const Container = ({ index, title, description, footerText, image }) => {
  return (
    <div
      className={`${styles.group} ${index === 1 && styles.middleGroup}`}
      key={index}
    >
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
        <p className={styles.footerText}>{footerText}</p>
      </div>
      <div className={styles.image}>
        <img src={image} alt={image} />
      </div>
    </div>
  );
};
