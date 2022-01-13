import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#7b1fa2",
    },
    secondary: {
      main: "#f50057",
    },
    success: {
      main: "#64dd17",
    },
    background: {
      default: "#2d2d2d",
      paper: "#ffffff",
    },
  },
});

export default theme;
