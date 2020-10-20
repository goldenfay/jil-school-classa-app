import { createMuiTheme } from "@material-ui/core/styles";
import {
  indigo,
  deepPurple,
  purple,
  red,
  green,
  deepOrange,
} from "@material-ui/core/colors";
const defaultTheme = createMuiTheme();

const bootstraptheme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff9800",
    },
    secondary: {
      main: "#f44336",
    },
  },
});
const cyclesTheme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: deepPurple,
    default: green,
  },
});

export { defaultTheme, bootstraptheme, cyclesTheme };
