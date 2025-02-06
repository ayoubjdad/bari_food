import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    // * Button
    MuiButton: {
      styleOverrides: {
        root: {
          gap: "8px",
          display: "flex",
          fontSize: "16px",
          boxShadow: "none",
          fontWeight: "600",
          color: "#1e1d23",
          borderRadius: "80px",
          width: "fit-content",
          padding: "10px 20px",
          textTransform: "none",
          fontFamily: "inherit",
          backgroundColor: "#ffc222",
        },
        startIcon: {
          marginLeft: 0,
          marginRight: 0,
        },
        endIcon: {
          marginLeft: 0,
          marginRight: 0,
        },
      },
    },

    // * Badge
    MuiBadge: {
      styleOverrides: {
        badge: {
          top: 6,
          color: "#1e1d23",
          backgroundColor: "#ffc222",
        },
      },
    },

    // * TextField
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-input": {
            padding: "10px 16px",
            fontFamily: "Poppins",
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
            borderRadius: "80px",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(255, 194, 34)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(255, 194, 34)",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#666",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "red",
            borderSize: "1px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ccc",
          },
        },
      },
    },

    // * Drawer
    MuiDrawer: {
      styleOverrides: {
        root: {
          "& .MuiDrawer-paper": {
            borderRadius: 0,
            backgroundColor: "white",
            boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
          },
        },
        paper: {
          width: 280,
          backgroundColor: "#1E1E2F",
          borderRadius: "0px 10px 10px 0px",
          boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.3)",
        },
      },
    },

    // * Radio Button
    MuiRadio: {
      styleOverrides: {
        root: {
          // color: "#1976d2", // Couleur par défaut
          "&.Mui-checked": {
            color: "#ffc222", // Couleur quand coché
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: "#333",
          fontSize: "14px",
          fontFamily: "Poppins",
        },
      },
    },

    // * Accordion
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          fontFamily: "Poppins",
          "&:before": { display: "none" },
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 0,
          color: "#1e1d23",
          borderRadius: "7px",
          padding: "13px 30px",
          backgroundColor: "#fbf7e8",
          "&.Mui-expanded": {
            minHeight: 0,
            backgroundColor: "#ffc222",
          },
        },
        content: {
          margin: 0,
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: 0,
          fontSize: "14px",
          fontFamily: "Poppins",
        },
      },
    },

    // * Popover
    MuiPopover: {
      styleOverrides: {
        paper: {
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});
