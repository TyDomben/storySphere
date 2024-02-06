// src/theme/theme.js
// TODO implement a dark mode light mode toggle button
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    // Define other light theme properties here
  },
  // Add more customization for the light theme
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // Define other dark theme properties here
  },
  // Add more customization for the dark theme
});
