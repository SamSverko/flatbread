import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          height: "100",
        },
        body: {
          height: "100vh",
        },
        "#__next": {
          display: "flex",
          minHeight: "100vh",
        },
      },
    },
  },
});

export default theme;
