import React from "react";
import styles from "./WhoWeAre.module.scss";
import PageHeader from "../../components/page-header/PageHeader";
import { Button } from "@mui/material";

export default function WhoWeAre() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <PageHeader title="Qui Sommes Nous" description="" />

        <div className={styles.topSection}>
          <div className={styles.topSectionText}>
            <h3>Welcome!</h3>
            <h1>Best burger ideas & traditions from the whole world</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
            <p>
              Mauris tempus erat laoreet turpis lobortis, eu tincidunt erat
              fermentum. Aliquam non tincidunt urna. Integer tincidunt nec nisl
              vitae ullamcorper. Proin sed ultrices erat.
            </p>
            <Button>Contactez-nous</Button>
          </div>
          <div className={styles.topSectionImages}>
            <img
              src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/image1-h4.jpg"
              alt=""
            />
            <div className={styles.topSubSectionImages}>
              <img
                src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/image2-h4.jpg"
                alt=""
              />
              <img
                src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/image3-h4.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
