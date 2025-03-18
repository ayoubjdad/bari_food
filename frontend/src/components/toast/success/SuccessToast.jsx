import styles from "./SuccessToast.module.scss";
import { toast } from "react-toastify";

export const displaySuccessNotification = (
  message = "Vos modifications ont été enregistrées avec succès !"
) => {
  toast.dismiss();
  return toast.success(message, {
    autoClose: 2500,
    position: "top-right",
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    className: `${styles.toastContainer} ${styles.success}`,
  });
};

export const displayErrorNotification = (
  message = "Une erreur est survenue. Veuillez réessayer."
) => {
  toast.dismiss();
  return toast.error(message, {
    autoClose: 2500,
    position: "top-right",
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    className: `${styles.toastContainer} ${styles.error}`,
  });
};

export const displayInfoNotification = (
  message = "Voici une information importante."
) => {
  toast.dismiss();
  return toast.info(message, {
    autoClose: 2500,
    position: "top-right",
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    className: `${styles.toastContainer} ${styles.info}`,
  });
};

export const displayInProgressNotification = (
  message = "Traitement en cours..."
) => {
  toast.dismiss();
  return toast.loading(message, {
    autoClose: 5000,
    position: "top-right",
    className: `${styles.toastContainer} ${styles.progress}`,
  });
};
