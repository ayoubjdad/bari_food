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
  },
});
