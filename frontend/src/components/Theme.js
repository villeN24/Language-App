import { createTheme } from "@mui/material/styles";

/**
 * Creates a theme with custom color palette.
 *
 * An object, that is used with material.ui components
 * to give them custom theme.
 */
const theme = createTheme({
  palette: {
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
