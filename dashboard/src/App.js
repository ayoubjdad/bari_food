import React from "react";
import Home from "./pages/home/Home";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/overrides";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}
