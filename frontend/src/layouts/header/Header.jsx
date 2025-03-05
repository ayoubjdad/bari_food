import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom"; // Fix: Use "react-router-dom" instead of "react-router"
import Badge from "@mui/material/Badge";
import { useCart } from "../../context/cart/CartContext";
import { Box, Button, Drawer, Popover, TextField } from "@mui/material";
import { useLogin } from "../../context/login/LoginContext"; // Import useLogin
import axios from "axios";
import logo from "../../assets/logo/bari-logo-green.png";
import { serverUrl } from "../../config/config";
import { displaySuccessNotification } from "../../components/toast/success/SuccessToast";

const menu = [
  {
    to: "/produits",
    alias: "Produits",
  },
  {
    to: "/qui-sommes-nous",
    alias: "Qui Sommes Nous",
  },
  {
    to: "/faq",
    alias: "FAQ",
  },
  {
    to: "/contact",
    alias: "Contact",
  },
];

export default function Header() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { login, logout, user, logged } = useLogin();

  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const cartLength = cart.length;

  const [open, setOpen] = useState(false);
  const [openMobileDrawer, setOpenMobileDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openLogin = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMobileDrawerOpen = () => {
    setOpenMobileDrawer(true);
  };

  const handleMobileDrawerClose = () => {
    setOpenMobileDrawer(false);
  };

  const handleLoginOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLoginClose = () => {
    setAnchorEl(null);
  };

  const handleCheckout = () => {
    navigate("/paiement");
    handleDrawerClose();
  };

  const handleLogin = async (email, password) => {
    try {
      // Send a POST request to your backend login endpoint
      const response = await axios.post(`${serverUrl}/api/auth/login`, {
        email,
        password,
      });

      // If login is successful
      if (response.data) {
        const { _id, name, email, isAdmin, token } = response.data;

        // Store the token in localStorage (optional)
        localStorage.setItem("token", token);

        // Update the login context with user data
        login({ _id, name, email, isAdmin }); // Use the login function from context

        handleLoginClose(); // Close the login modal
        displaySuccessNotification("Connexion réussie !");
      } else {
        alert("Email ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert("Erreur lors de la connexion. Veuillez réessayer.");
    }
  };

  const handleLogout = () => {
    logout(false); // Update login state
    alert("Déconnexion réussie !");
  };

  return (
    <>
      <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
        <div className={styles.drawerHeader}>
          <img src={logo} alt="logo" className={styles.logo} />
          <Box
            component="i"
            className="fi fi-rr-cross"
            onClick={handleDrawerClose}
          />
        </div>

        <div className={styles.drawerBody}>
          <ul className={styles.drawerMenu}>
            {cart?.length > 0 ? (
              cart.map((product) => (
                <Product
                  key={product.id} // Add key prop
                  product={product}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                />
              ))
            ) : (
              <p>Votre panier est vide</p>
            )}
          </ul>
        </div>

        <div className={styles.drawerFooter}>
          <h3>Prix total: {totalPrice} DH</h3>
          <Button style={{ width: "100%" }} onClick={handleCheckout}>
            Passer la commande
          </Button>
        </div>
      </Drawer>

      <Drawer
        anchor="right"
        open={openMobileDrawer}
        onClose={handleMobileDrawerClose}
      >
        <div className={styles.drawerHeader}>
          <img src={logo} alt="logo" className={styles.logo} />
          <Box
            component="i"
            className="fi fi-rr-cross"
            onClick={handleMobileDrawerClose}
          />
        </div>

        <div className={styles.drawerBody}>
          <ul className={styles.mobileMenu}>
            {menu.map(({ to, alias }) => (
              <List
                key={to}
                to={to}
                alias={alias}
                onClick={handleMobileDrawerClose}
              />
            ))}
          </ul>
        </div>

        <div className={styles.drawerFooter}></div>
      </Drawer>

      <header className={styles.main}>
        <nav className={styles.container}>
          <img
            src={logo}
            alt="logo"
            className={styles.logo}
            onClick={() => navigate("/")}
          />

          <ul className={styles.menu}>
            {menu.map(({ to, alias }) => (
              <List
                key={to}
                to={to}
                alias={alias}
                onClick={handleMobileDrawerClose}
              />
            ))}
          </ul>

          <ul className={styles.shippingContainer}>
            <li className={styles.shipping}>
              <i className="fi fi-rr-shipping-fast" />
              <div className={styles.shippingText}>
                <p>Whatsapp</p>
                <p className={styles.phone}>+212 664 27 35 23</p>
              </div>
            </li>

            <div className={styles.mobileMenuBurger}>
              <List
                alias={<i className="fi fi-rr-menu-burger" />}
                onClick={handleMobileDrawerOpen}
              />
            </div>

            <div className={styles.userCartContainer}>
              <List
                alias={<i className="fi fi-rr-user" />}
                onClick={handleLoginOpen}
              />

              {openLogin ? (
                <LoginModal
                  user={user}
                  open={openLogin}
                  logged={logged}
                  onClose={handleLoginClose}
                  onLogin={handleLogin}
                  anchorEl={anchorEl}
                  onLogout={handleLogout}
                />
              ) : null}
            </div>

            <Badge badgeContent={String(cartLength)} color="primary">
              <List
                to="/"
                alias={<i className="fi fi-rr-shopping-cart" />}
                onClick={handleDrawerOpen}
              />
            </Badge>
          </ul>
        </nav>
      </header>
    </>
  );
}

const List = ({ to, alias, onClick }) => {
  return (
    <li onClick={onClick}>
      <Link to={to}>{alias}</Link>
    </li>
  );
};

const Product = ({ product, removeFromCart, updateQuantity }) => {
  const { id, name, price, quantity } = product;

  return (
    <div className={styles.product} key={id}>
      <Box
        component="i"
        className="fi fi-rr-cross"
        onClick={() => removeFromCart(id)}
      />
      <div className={styles.productImage}>
        <img
          src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/40-1-150x150.png"
          alt={name}
        />
      </div>
      <div className={styles.productCaption}>
        <p>{name}</p>
        <p>
          {quantity} x <span className={styles.productPrice}>{price} DH</span>
        </p>
      </div>
      <Box
        component="i"
        className={`fi fi-rr-plus ${styles.addIcon}`}
        onClick={() => updateQuantity(id, quantity + 1)}
      />
    </div>
  );
};

const LoginModal = ({
  user = {},
  open = false,
  logged = false,
  onClose = () => {},
  onLogin = () => {},
  onLogout = () => {},
  anchorEl,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password); // Call the login handler
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {logged ? (
        <div className={styles.loginModal}>
          <h3>Bonjour {user.name}</h3>
          <Button onClick={onLogout} style={{ width: "100%", height: "43px" }}>
            Déconnexion
          </Button>
        </div>
      ) : (
        <div className={styles.loginModal}>
          <div className={styles.loginModalHeader}>
            <h3>Connexion</h3>
            <Link to="/inscription" onClick={onClose}>
              Créer un compte
            </Link>
          </div>
          <div className={styles.loginModalBody}>
            <form onSubmit={handleSubmit}>
              <TextField
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                placeholder="Mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" style={{ width: "100%", height: "43px" }}>
                Connexion
              </Button>
            </form>
          </div>
        </div>
      )}
    </Popover>
  );
};
