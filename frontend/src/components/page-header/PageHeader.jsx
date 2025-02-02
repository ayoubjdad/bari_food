import React from "react";
import styles from "./PageHeader.module.scss";

export default function PageHeader({ title, description }) {
  return (
    <div className={styles.main}>
      <h1>{title}</h1>
    </div>
  );
}
