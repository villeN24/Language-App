import { createTheme } from "@mui/material/styles";
import { purple, orange, red } from "@mui/material/colors";

const primaryColor = purple[500];
const secondaryColor = orange[500];
const dangerColor = red[900];

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: primaryColor,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: secondaryColor,
      // dark: will be calculated from palette.secondary.main,
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

export default theme;
