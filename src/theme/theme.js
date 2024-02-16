/**
 * Theme Configuration for Material UI in a React Application
 *
 * This file is crucial for defining the light and dark mode themes using Material UI's createTheme function.
 * It leverages a dynamic approach to theme customization, allowing for a seamless transition between light and dark modes based on user preference.
 *
 * Key Concepts:
 * - Utilizes the getDesignTokens function to define color palettes, background colors, and text styles specific to light and dark modes.
 * - Employs conditional logic within getDesignTokens to toggle between light and dark mode palettes.
 * - The lightTheme and darkTheme are exported as constants, created by passing 'light' or 'dark' mode strings to the getDesignTokens function.
 * - The theme object contains both lightTheme and darkTheme for easy access and application throughout the React application.
 *
 * Usage:
 * - Import the theme object into your application's root (e.g., App.js) or theme provider context to apply the light or dark theme based on user settings or system preferences.
 * - Use the createTheme function from @mui/material/styles to ensure compatibility and leverage Material UI's theming capabilities.
 *
 * Palette Details:
 * - Light Mode features a primary color of blue with black contrast text, and a secondary color of pink with white contrast text.
 * - Dark Mode features a primary color of light blue with black contrast text, and a secondary color of lighter pink with black contrast text.
 * - Background and text colors are adjusted accordingly to enhance readability and user experience in both modes.
 *
 * References:
 * - Material UI Dark Mode Customization: https://mui.com/material-ui/customization/dark-mode/
 *
 * Future Enhancements:
 * - Consider adding a user preference setting to automatically switch between light and dark modes.
 * - Explore extending the theme configuration to include typography, shape, and other design elements for a more customized user interface.
 *
 * Dependencies:
 * - @mui/material for Material UI components and styles.
 *
 */

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