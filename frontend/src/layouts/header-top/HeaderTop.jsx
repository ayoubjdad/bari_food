import React from "react";
import styles from "./HeaderTop.module.scss";

export default function HeaderTop({ text, style }) {
  return (
    <header className={styles.main} style={style}>
      <div className={styles.container}>{text}</div>
    </header>
  );
}
