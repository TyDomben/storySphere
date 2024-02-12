// src/theme/theme.js
// !this is a neccesary file - the declaration of dark and light mode at the bottom
import { createTheme } from "@mui/material/styles";
// https://mui.com/material-ui/customization/dark-mode/
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light Mode Palette
          primary: {
            main: "#1976d2", // Blue (keep or adjust as needed)
            contrastText: "#000000", // Black, strong contrast against blue
          },
          secondary: {
            main: "#dc004e", // Pink (keep or adjust as needed)
            contrastText: "#ffffff", // White, excellent contrast against pink
          },
          background: {
            default: "#f3f6f9", // Off-white background
            paper: "#ffffff", // Pure white for elements like cards
          },
          text: {
            primary: "#121212", // Very dark text for main content
            secondary: "#505050", // Slightly lighter, good for secondary text
          },
        }
      : {
          // Dark Mode Palette
          primary: {
            main: "#90caf9", // Light blue
            contrastText: "#000000", // Black, strong contrast against light blue
          },
          secondary: {
            main: "#f48fb1", // Lighter pink
            contrastText: "#000000", // Black for sufficient contrast
          },
          background: {
            default: "#121212", // Dark grey background
            paper: "#202020", // Slightly lighter for cards/raised elements
          },
          text: {
            primary: "#f0f0f0", // Off-white, good readability on dark
            secondary: "#aaaaaa", // Lighter grey for less importance
          },
        }),
  },
});
export const lightTheme = createTheme(getDesignTokens("light"));
export const darkTheme = createTheme(getDesignTokens("dark"));
export const theme = { lightTheme, darkTheme }