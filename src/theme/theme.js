// src/theme/theme.js
// !this is a neccesary file - the declaration of dark and light mode at the bottom
import { createTheme } from "@mui/material/styles";
// https://mui.com/material-ui/customization/dark-mode/
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Palette values for light mode
          primary: {
            main: "#1976d2", // blue
          },
          secondary: {
            main: "#dc004e", // pink
          },
          background: {
            default: "#f3f6f9", // Light grey background
            paper: "#ffffff",
          },
        }
      : {
          // Palette values for dark mode
          primary: {
            main: "#90caf9", // Lighter blue for contrast against dark backgrounds
          },
          secondary: {
            main: "#f48fb1", // Lighter pink for contrast
          },
          background: {
            default: "#121212", // Dark grey background
            paper: "#1e1e1e",
          },
          text: {
            primary: "#e0e0e0",
            secondary: "#aaaaaa",
          },
        }),
  },
  // Add any other global overrides and customizations here
});

// Create a light mode theme
export const lightTheme = createTheme(getDesignTokens("light"));

// Create a dark mode theme
export const darkTheme = createTheme(getDesignTokens("dark"));
