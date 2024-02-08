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
  // useTheme,
} from "@mui/material";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useTheme } from "../../theme/ThemeContext";

// Import the toggleTheme action from the actions folder

function Nav({ toggleTheme }) {
  // Receive toggleTheme as a prop
  const [mode, setMode] = useState("light");
  const user = useSelector((store) => store.user);
  // const theme = useTheme(); // Access the current theme
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

  // const handleThemeChange = () => {
  //   setMode((prevMode) => (prevMode === "light" ? "dark" : "light")); // Toggle State
  // };
  // const { toggleTheme, themeMode } = useTheme(); // Use this for toggling and displaying the theme

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            // Access theme colors (needs proper ThemeProvider setup still)

            // color: theme.palette.text.primary, // Dynamically set the text color based on the theme
            textDecoration: "none", // Optional: Removes underline from the link
          }}
        >
          {" "}
          StorySphere by Ty
        </Typography>
        {/* Theme toggle switch */}
        <FormControlLabel
          control={
            <Switch
              // You might want to manage `checked` state based on the prop
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
            <Button color="inherit" component={RouterLink} to="/user">
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
