/**
 * Theme Context Provider for React Applications
 *
 * This module creates a React context for theme management, enabling components within the application to easily switch between light and dark modes. It encapsulates the context creation, a custom hook for accessing the context, and a provider component for wrapping the application or specific parts of it.
 *
 * Key Components:
 * - ThemeContext: A React context created by the createContext function. It is the foundation for enabling theme switching across the application.
 * - useTheme: A custom hook that simplifies the process of accessing the theme context. It allows any component to get the current theme mode and the function to toggle the theme.
 * - ThemeProvider: A context provider component that accepts children components. It manages the theme state and provides the current theme and a toggle function to all child components through context.
 *
 * How It Works:
 * - The ThemeProvider component initializes themeMode state to 'light' using useState. It also defines a toggleTheme function that switches the themeMode state between 'light' and 'dark'.
 * - The ThemeContext.Provider component wraps the children props, passing the themeMode and toggleTheme as the context value. This makes them available to any descendant component that accesses the context via the useTheme hook.
 *
 * Usage:
 * - Wrap your application or component tree with the ThemeProvider to provide the theme context to all components.
 * - Use the useTheme hook in any component to access the themeMode and toggleTheme, enabling theme switching from anywhere in the component tree.
 *
 * Example:
 * ```jsx
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <YourComponent />
 *     </ThemeProvider>
 *   );
 * }
 *
 * function YourComponent() {
 *   const { themeMode, toggleTheme } = useTheme();
 *   return (
 *     <button onClick={toggleTheme}>
 *       Switch to {themeMode === 'light' ? 'dark' : 'light'} mode
 *     </button>
 *   );
 * }
 * ```
 *
 * Future Enhancements:
 * - Integrate persistent storage (e.g., localStorage) to remember the user's theme preference across sessions.
 * - Provide options for more granular theme customization beyond simple light and dark modes.
 *
 * Dependencies:
 * - React library for utilizing React features such as createContext, useContext, and useState.
 *
 */

import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
