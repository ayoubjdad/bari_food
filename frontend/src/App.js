import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./layouts/header/Header";
import Home from "./pages/home/Home";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/overrides";
import Product from "./pages/product/Product";
import { CartProvider } from "./context/cart/CartContext";
import Products from "./pages/products/Products";
import Shipping from "./layouts/footer/shipping/Shipping";
import Copyright from "./layouts/footer/copyright/Copyright";
import WhoWeAre from "./pages/who-we-are/WhoWeAre";
import Contact from "./pages/contact/Contact";
import FAQ from "./pages/faq/FAQ";
import Checkout from "./pages/checkout/Checkout";
import { ToastContainer } from "react-toastify";
import SignIn from "./pages/sign-in/SignIn";

// App Component
const App = () => (
  <CartProvider>
    <ToastContainer />
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produit/:id/:slug" element={<Product />} />
          <Route path="/produits" element={<Products />} />
          <Route path="/produits/:slug" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/qui-sommes-nous" element={<WhoWeAre />} />
          <Route path="/paiement" element={<Checkout />} />
          <Route path="/inscription" element={<SignIn />} />
        </Routes>
        <Shipping />
        <Copyright />
      </Router>
    </ThemeProvider>
  </CartProvider>
);

export default App;
