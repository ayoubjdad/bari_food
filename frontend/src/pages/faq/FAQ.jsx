import React from "react";
import styles from "./FAQ.module.scss";
import PageHeader from "../../components/page-header/PageHeader";

export default function FAQ() {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <PageHeader title="FAQ" />
      </div>
    </section>
  );
}
