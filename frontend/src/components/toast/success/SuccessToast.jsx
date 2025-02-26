import styles from "./SuccessToast.module.scss";
import { toast } from "react-toastify";

export const displaySuccessNotification = (
  message = "Your changes have been successfully saved !"
) => {
  toast.dismiss();
  return toast.success(message, {
    autoClose: 25055500000,
    position: "top-right",
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    className: styles.toastContainer,
    bodyClassName: styles.toastBody,
  });
};
