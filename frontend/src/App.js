import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import { LoginProvider } from "./context/login/LoginContext";
import ScrollToTop from "./layouts/scroll-to-top/ScrollToTop";
import MainFooter from "./layouts/footer/main/MainFooter";
import HeaderTop from "./layouts/header-top/HeaderTop";
import Dashboard from "./pages/dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./context/protected-route/ProtectedRoute";
import Login from "./pages/login/Login";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LoginProvider>
        <CartProvider>
          <ToastContainer />
          <ThemeProvider theme={theme}>
            <Router>
              <AppContent />
            </Router>
          </ThemeProvider>
        </CartProvider>
      </LoginProvider>
    </QueryClientProvider>
  );
};

const AppContent = () => {
  const location = useLocation();
  const path = location.pathname;
  const withoutContainers = [
    "/inscription",
    "/connexion",
    "/dashboard",
  ].includes(path);

  return (
    <>
      {!withoutContainers && (
        <>
          <HeaderTop text="🚀 Soyez parmi les 200 livrés par jour & profitez de nos offres exclusives et de la livraison rapide !" />
          <HeaderTop
            text="Commande minimum : 150dh produits frais et cuits 250dh produits surgelés"
            style={{ backgroundColor: "#1e1e1e" }}
          />
          <Header />
        </>
      )}
      <ScrollToTop />
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
        <Route path="/connexion" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      {!withoutContainers && (
        <>
          <Shipping />
          <MainFooter />
          <Copyright />
        </>
      )}
    </>
  );
};

export default App;
