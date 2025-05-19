import { colors } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export const themeModes = {
  dark: "dark",
  light: "light",
};

const themeConfig = {
  custom: ({ mode }) => {
    const customPallete =
      mode === themeModes.dark
        ? {
            primary: {
              main: "#ff0000",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#f33336",
              contrastText: "#ffffff",
            },
            background: {
              default: "#000000",
              paper: "#131313",
            },
          }
        : {
            primary: {
              main: "#ff0000",
            },
            secondary: {
              main: "#f33336",
            },
            background: {
              default: colors.grey[100],
            },
          };

    return createTheme({
      palette: {
        mode,
        ...customPallete,
      },
      components: {
        MuiButton: {
          defaultProps: {
            disableElevation: true,
          },
        },
      },
    });
  },
};

export default themeConfig;
