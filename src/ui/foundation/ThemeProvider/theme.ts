import { createTheme } from "@mui/material/styles";

type CustomColor = {
  accent: string;
  primary: { light: string; medium: string; dark: string };
};

declare module "@mui/material/styles" {
  interface Palette {
    custom: CustomColor;
  }
  interface PaletteOptions {
    custom: CustomColor;
  }
}

const themeColors = {
    light: {
        accent: "#8273e6",
        primary: {
            light: "#ffffff",
            medium: "#f2f3f5",
            dark: "#e3e5e8",
        },
    },
    dark: {
        accent: "#4d3ca6",
        primary: {
            light: "#202020",
            medium: "#161616",
            dark: "#060606",
        },
    },
};

const lightTheme = {
    primary: {
        main: themeColors.light.accent,
    },
    secondary: {
        main: themeColors.light.primary.medium,
        dark: themeColors.light.primary.dark,
    },
    text: {
        primary: "#2e3338",
        secondary: "#8d9193",
    },
    background: {
        default: themeColors.light.primary.light,
    },
};

const darkTheme = {
    primary: {
        main: themeColors.dark.accent,
    },
    secondary: {
        main: themeColors.dark.primary.medium,
        dark: themeColors.dark.primary.dark,
    },
    text: {
        primary: "#dcddde",
        secondary: "#8e8e8e",
    },
    background: {
        default: themeColors.dark.primary.light,
    },
};

const theme = (mode: "light" | "dark") => {
    return createTheme({
        palette: {
            mode,
            ...(mode === "light" ? lightTheme : darkTheme),
            custom: { ...(mode === "light" ? themeColors.light : themeColors.dark) },
        },
        components: {
            MuiToolbar: {
                defaultProps: {
                    variant: "dense",
                },
            },
        },
    });
};

export default theme;
