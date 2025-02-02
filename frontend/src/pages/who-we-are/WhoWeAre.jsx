import React from "react";
import styles from "./WhoWeAre.module.scss";
import PageHeader from "../../components/page-header/PageHeader";

export default function WhoWeAre() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <PageHeader title="Qui Sommes Nous" description="" />
      </div>
    </section>
  );
}
