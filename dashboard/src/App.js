import React from "react";
import Home from "./pages/home/Home";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/overrides";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
