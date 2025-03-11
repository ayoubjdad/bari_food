import React, { useState } from "react";
import styles from "./SignIn.module.scss";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { serverUrl } from "../../config/config";
import { displaySuccessNotification } from "../../components/toast/success/SuccessToast";
import lionLogo from "../../assets/logo/bari-lion.png";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await axios.post(`${serverUrl}/api/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      displaySuccessNotification("Inscription réussie!");
      navigate("/");
    } catch (error) {
      console.error(
        "❌ Registration failed:",
        error.response?.data?.message || error.message
      );
      alert("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <img src={lionLogo} alt="logo" />
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: "100%" }}
            required
          />
          <TextField
            name="name"
            placeholder="Nom complet"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "100%" }}
            required
          />
          <TextField
            name="phone"
            placeholder="Téléphone"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: "100%" }}
            required
          />
          <TextField
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            style={{ width: "100%" }}
            required
          />
          <TextField
            type="password"
            name="confirmPassword"
            placeholder="Répétez votre mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ width: "100%" }}
            required
          />
          <Button type="submit" style={{ width: "100%" }}>
            Inscription
          </Button>
        </form>
      </div>
    </section>
  );
}
