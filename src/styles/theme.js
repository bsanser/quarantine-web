import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#73E9A2",
    },
    secondary: {
      main: "#F820D5",
    },
    terciary: {
      main: "#47CBF4",
    },
    error: {
      main: "#F820D5",
    },
    warning: {
      main: "#F95EE0",
    },

    info: {
      main: "#47CBF4",
    },
    success: {
      main: "#73E9A2",
    },

    background: {
      default: "#fff",
      secondary: "#C4C4C4",
    },
  },
  typography: {
    fontFamily: [
      "Nunito",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontWeight: 900,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 768,
      lg: 1024,
      xl: 1920
    }
  }
});

export default theme;
