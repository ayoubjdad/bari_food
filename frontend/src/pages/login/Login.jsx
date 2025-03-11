import React, { useState } from "react";
import styles from "./Login.module.scss";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { serverUrl } from "../../config/config";
import {
  displayErrorNotification,
  displaySuccessNotification,
} from "../../components/toast/success/SuccessToast";
import { useLogin } from "../../context/login/LoginContext";
import lionLogo from "../../assets/logo/bari-lion.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useLogin();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // If login is successful
      if (response.data && response.data.token) {
        const { _id, name, email, isAdmin, token } = response.data;

        // Store the token in localStorage (secure storage recommendation)
        localStorage.setItem("token", token);

        // Update the login context with user data
        login({ _id, name, email, isAdmin });

        displaySuccessNotification("Connexion réussie !");
        navigate("/dashboard");
      } else {
        displayErrorNotification("Email ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error(
        "❌ Login failed:",
        error.response?.data?.message || error.message
      );
      displayErrorNotification(
        error.response?.data?.message || "Erreur lors de la connexion."
      );
    } finally {
      setLoading(false); // Hide loading state
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
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            style={{ width: "100%" }}
            required
          />

          <Button
            type="submit"
            style={{ width: "100%" }}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </div>
    </section>
  );
}
