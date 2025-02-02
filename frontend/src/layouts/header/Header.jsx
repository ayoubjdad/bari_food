import React from "react";
import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router";
import Badge from "@mui/material/Badge";
import { useCart } from "../../context/cart/CartContext";

const menu = [
  {
    to: "/produits",
    alias: "Produits",
  },
  {
    to: "/faq",
    alias: "Qui Sommes Nous",
  },
  {
    to: "/about",
    alias: "A propos",
  },
  {
    to: "/contact",
    alias: "Contact",
  },
];

export default function Header() {
  const { cart } = useCart();
  const cartLength = cart.length;
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <header className={styles.main}>
      <nav className={styles.container}>
        {/* <img
          className={styles.logo}
          src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/10/logo_svg.svg"
          alt="logo"
        /> */}
        <h1 onClick={goHome}>Bari Food</h1>

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
          <List to="/" alias={<i className="fi fi-rr-user" />} />
          <Badge badgeContent={String(cartLength)} color="primary">
            <List to="/" alias={<i className="fi fi-rr-shopping-cart" />} />
          </Badge>
        </ul>
      </nav>
    </header>
  );
}

const List = ({ to, alias }) => {
  return (
    <li>
      <Link to={to}>{alias}</Link>
    </li>
  );
};
