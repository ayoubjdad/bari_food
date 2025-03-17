import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    // * Autocomplete
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            height: "43px",
            padding: "0 16px",
            "& .MuiAutocomplete-input": {
              padding: 0,
            },
          },
        },
        option: {
          fontWeight: 500,
          fontSize: "14px",
          color: "#1e1d23",
          fontFamily: "Gilroy",
        },
      },
    },

    // * Button
    MuiButton: {
      styleOverrides: {
        root: {
          gap: "8px",
          display: "flex",
          fontSize: "16px",
          boxShadow: "none",
          fontWeight: "600",
          color: "white",
          borderRadius: "80px",
          width: "fit-content",
          padding: "10px 20px",
          textTransform: "none",
          fontFamily: "inherit",
          backgroundColor: "#0a5440",
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
          color: "white",
          backgroundColor: "#0a5440",
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
              borderColor: "#0a5440",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0a5440",
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
            color: "#006400", // Couleur quand coché
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
          backgroundColor: "#faf9f6",
          "&.Mui-expanded": {
            minHeight: 0,
            backgroundColor: "#50a649",
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

    // * Chip
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          fontWeight: "600",
          backgroundColor: "#50a6491a",
          border: "1px solid #0a5440",
          color: "#0a5440",
          width: "fit-content",
          fontFamily: "Poppins",
        },
      },
    },

    // ===========================================================

    // * Tabs
    MuiTabs: {
      styleOverrides: {
        flexContainer: {
          width: "fit-content",
          borderRadius: "80px",
          border: "1px solid #e5e5e5",
        },
        scroller: {
          display: "flex",
          justifyContent: "center",
        },
        root: {
          "& .MuiTabs-indicator": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: "600",
          textTransform: "none",
          fontFamily: "Gilroy",
          borderRadius: "80px",
          padding: "10px 20px",
          minHeight: "44.5px",
          "&.Mui-selected": {
            backgroundColor: "#0a5440",
            color: "white",
          },
        },
      },
    },

    // * Table
    MuiTable: {
      styleOverrides: {
        root: {
          padding: "16px",
          borderRadius: "16px",
          border: "1px solid #e5e5e5",

          "& .MuiTableCell-root": {
            fontSize: "14px",
            color: "#1e1d23",
            fontFamily: "Gilroy",
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            borderBottom: 0,
            fontSize: "14px",
            fontWeight: "700",
            color: "#1e1d23",
            fontFamily: "Gilroy",
            padding: "10px 16px",
            backgroundColor: "#faf9f6",
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            fontSize: "14px",
            fontFamily: "Gilroy",
            color: "#1e1d23",
            padding: "10px 16px",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            fontWeight: 500,
            fontSize: "14px",
            fontFamily: "Gilroy",
            color: "#1e1d23",
            padding: "10px 16px",
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          "& .MuiTablePagination-select": {
            fontSize: "14px",
            color: "#1e1d23",
            padding: "10px 16px",
            fontFamily: "Gilroy",
          },
        },
      },
    },

    // * Modal
    MuiModal: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          // backgroundColor: "white",
        },
      },
    },
  },
});
