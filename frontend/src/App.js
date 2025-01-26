import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./layouts/header/Header";
import Home from "./pages/home/Home";

// App Component
const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    {/* <Footer /> */}
  </Router>
);

export default App;
