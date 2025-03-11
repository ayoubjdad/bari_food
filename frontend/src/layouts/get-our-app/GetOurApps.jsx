import React from "react";
import styles from "./GetOurApps.module.scss";
import appStore from "../../assets/images/app-store.png";
import appDownload from "../../assets/images/app-download.png";

export default function GetOurApps() {
  return (
    <section className={styles.main}>
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${appDownload})`,
        }}
      >
        <div className={styles.left}>
          <h1>
            Téléchargez notre <span>Application Mobile</span>
          </h1>
        </div>
        <div className={styles.appStore}>
          <img src={appStore} alt="Google Play" />
        </div>
      </div>
    </section>
  );
}
