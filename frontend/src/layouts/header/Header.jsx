import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router";

const menu = [
  {
    to: "/cart",
    alias: "Produits",
  },
  {
    to: "/checkout",
    alias: "Blog",
  },
  {
    to: "/faq",
    alias: "Qui Sommes Nous",
  },
  {
    to: "/about",
    alias: "A porpos",
  },
  {
    to: "/contact",
    alias: "Contact",
  },
];

export default function Header() {
  return (
    <header className={styles.main}>
      <nav className={styles.container}>
        <img
          className={styles.logo}
          src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/10/logo_svg.svg"
          alt="logo"
        />

        <ul className={styles.menu}>
          {menu.map(({ to, alias }) => (
            <List to={to} alias={alias} />
          ))}
        </ul>

        <ul>
          <li style={{ display: "flex" }}>
            <i className="fi fi-rr-circle-user" />
            <div style={{ display: "grid" }}>
              <p>Call and Order in</p>
              <p>+1 718-904-4450</p>
            </div>
          </li>
          <List to="/" alias={<i className="fi fi-rr-circle-user" />} />
          <List to="/" alias={<i className="fi fi-rr-circle-user" />} />
          <List to="/" alias={<i className="fi fi-rr-circle-user" />} />
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
