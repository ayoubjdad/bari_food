import React from "react";
import styles from "./WhoWeAre.module.scss";
import PageHeader from "../../components/page-header/PageHeader";
import { Button } from "@mui/material";
import image1 from "../../assets/images/image1-h4.jpg";
import image2 from "../../assets/images/image2-h4.jpg";
import image3 from "../../assets/images/image3-h4.jpg";
import { useNavigate } from "react-router-dom"; // Fix: Use "react-router-dom" instead of "react-router"

export default function WhoWeAre() {
  const navigate = useNavigate();

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <PageHeader title="Qui Sommes Nous" description="" />

        <div className={styles.topSection}>
          <div className={styles.topSectionText}>
            <h3>Welcome!</h3>
            <h1>Du surgelé à la dégustation en un clin d’œil !</h1>
            <p>
              Plus besoin de perdre du temps en cuisine ! Bari vous propose une
              sélection exquise de produits surgelés prêts à l’emploi. Découvrez
              notre gamme complète de pains boulangers et de viennoiseries pur
              beurre, conçus pour être enfournés en quelques minutes et dégustés
              dans toute leur fraîcheur.
            </p>
            <p>
              Savourez également nos délicieuses pâtisseries et desserts glacés,
              préparés avec soin par nos chefs pour ravir vos papilles. Chaque
              bouchée est une invitation à la gourmandise, avec des recettes
              authentiques et des ingrédients de qualité.
            </p>
            <Button onClick={() => navigate("/contact")}>Contactez-nous</Button>
          </div>
          <div className={styles.topSectionImages}>
            <img src={image1} alt="" />
            <div className={styles.topSubSectionImages}>
              <img src={image2} alt="" />
              <img src={image3} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
