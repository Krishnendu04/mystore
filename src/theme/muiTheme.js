import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3c3247",
    },
    secondary: {
      main: "#f59e0b",
    },
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          maxHeight: 200,     // dropdown max height
          overflowY: "auto",  // vertical scrollbar
        },
      },
    },
  },
});

export default theme;