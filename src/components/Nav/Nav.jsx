/**
 * Navigation Component for StorySphere by Ty
 * 
 * This component renders the navigation bar using Material UI components and integrates with Redux for state management.
 * It supports dynamic theming and adjusts according to the user's theme preference stored in local storage.
 * 
 * Features:
 * - Dynamic theme toggle switch for light/dark mode.
 * - Conditional rendering of navigation links based on user authentication status.
 * - Utilizes React Router for navigation.
 * - Integrates with the Redux store to access the user's authentication status.
 * 
 * TODO:
 * - Expand the navigation paths to include additional components such as /user, /login, and /register as separate components.
 * - Implement the admin dashboard accessible only to authenticated admin users.
 * 
 * NOTE:
 * - The useTheme hook is commented out as it's inherited from the parent component. Consider removing or uncommenting based on the final theme management implementation.
 * - Ensure that theme mode changes are consistently applied across the application for a seamless user experience.
 * 
 * Dependencies:
 * - react, react-redux, react-router-dom, @mui/material
 * 
 * Props:
 * - toggleTheme: Function to toggle the theme mode (light/dark).
 * 
 * Usage:
 * - Import and place <Nav toggleTheme={functionToToggleTheme} /> in the application's layout component to display the navigation bar across the application.
 * 
 * Future Enhancements:
 * - Add more sophisticated state management for user authentication to support roles and permissions.
 * - Optimize theme toggling for better performance and user experience.
 * 
 */

import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  // useTheme,// inherited right now
} from "@mui/material";
import LogOutButton from "../LogOutButton/LogOutButton";
// import { useTheme } from "../../theme/ThemeContext"; // inherited right now

function Nav({ toggleTheme }) {
  // Receive toggleTheme as a prop
  const [mode, setMode] = useState("light");
  const user = useSelector((store) => store.user);
  // const theme = useTheme(); // Access the current theme // inherited right now
  // Load on Mount - Check Local Storage first
  useEffect(() => {
    const storedMode = localStorage.getItem("themeMode");
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  // Save on Change in Local Storage
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]); // Run effect every time 'mode' changes.

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            color: "inherit", // * Inherit color from parent
            textDecoration: "none",
          }}
        >
          {" "}
          StorySphere by Ty
        </Typography>
        {/* Theme toggle switch */}
        <FormControlLabel
          control={
            <Switch
              //might want to manage `checked` state based on the prop
              onChange={toggleTheme} // Use toggleTheme directly
              name="themeToggle"
              color="default"
            />
          }
          label="Toggle Theme" // Adjust label as needed
        />
        {/* Conditionally render links based on user login status */}
        {/* The About link is always visible */}
        <Button color="inherit" component={RouterLink} to="/about">
          About
        </Button>
        {user.id ? (
          // Links to show when user is logged in
          <>      
            <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/gallery">
              Gallery
            </Button>
            <Button color="inherit" component={RouterLink} to="/desk">
              Desk
            </Button>
            {/* TODO: Implement admin dashboard */}
            {/* <Button color="inherit" component={RouterLink} to="/admin-dashboard">
              Admin Dashboard
            </Button> */}

            <LogOutButton color="error" />
          </>
        ) : (
          // Links to show when no user is logged in
          <Button color="inherit" component={RouterLink} to="/login">
            Login / Register
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
