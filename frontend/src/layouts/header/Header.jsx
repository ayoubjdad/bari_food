import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router";
import Badge from "@mui/material/Badge";
import { useCart } from "../../context/cart/CartContext";
import { Box, Button, Drawer, Popover, TextField } from "@mui/material";

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

  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const cartLength = cart.length;

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openLogin = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleloginOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleloginClose = () => {
    setAnchorEl(null);
  };

  const handleCheckout = () => {
    navigate("/paiement");
    handleDrawerClose();
  };

  return (
    <>
      <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
        <div className={styles.drawerHeader}>
          <h2>Bari Food</h2>
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

      <header className={styles.main}>
        <nav className={styles.container}>
          {/* <img
          className={styles.logo}
          src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/10/logo_svg.svg"
          alt="logo"
        /> */}
          <h1 onClick={() => navigate("/")}>Bari Food</h1>

          <ul className={styles.menu}>
            {menu.map(({ to, alias }) => (
              <List to={to} alias={alias} />
            ))}
          </ul>

          <ul className={styles.shippingContainer}>
            <li className={styles.shipping}>
              <i className="fi fi-rr-shipping-fast" />
              <div className={styles.shippingText}>
                <p>Call and Order in</p>
                <p className={styles.phone}>+1 718-904-4450</p>
              </div>
            </li>
            <div>
              <List
                to="/"
                alias={<i className="fi fi-rr-user" />}
                onClick={handleloginOpen}
              />

              {openLogin ? (
                <LoginModal
                  open={openLogin}
                  onClose={handleloginClose}
                  anchorEl={anchorEl}
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
        className="fi fi-rr-plus"
        onClick={() => updateQuantity(id, quantity + 1)}
      />
    </div>
  );
};

const LoginModal = ({ open, onClose, anchorEl }) => {
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
      <div className={styles.loginModal}>
        <div className={styles.loginModalHeader}>
          <h3>Connexion</h3>
          <Link to="/inscription">Créer un compte</Link>
        </div>
        <div className={styles.loginModalBody}>
          <form>
            <TextField placeholder="Email" type="email" />
            <TextField placeholder="Mot de passe" type="password" />
            <Button style={{ width: "100%", height: "43px" }}>Connexion</Button>
          </form>
        </div>
      </div>
    </Popover>
  );
};
