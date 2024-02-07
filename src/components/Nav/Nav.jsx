import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  useTheme, // Import the useTheme hook from MUI
} from "@mui/material";
import LogOutButton from "../LogOutButton/LogOutButton";

function Nav({ toggleTheme, mode }) {
  const theme = useTheme(); // Now theme is defined

  const user = useSelector((store) => store.user);
  // const theme = useTheme(); // Access the current theme
  const handleThemeChange = (event) => {
    toggleTheme(); // Call the function passed from App to toggle the theme
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            color: theme.palette.text.primary, // Dynamically set the text color based on the theme
            textDecoration: "none", // Optional: Removes underline from the link
          }}
        >
          {" "}
          StorySphere by Ty
        </Typography>
        {/* Theme toggle switch */}
        {/* right now the theme is stuck on "dark" and it does not toggle - the actual theme is light however  */}
        <FormControlLabel
          control={
            <Switch
              checked={mode === "dark"}
              onChange={handleThemeChange}
              name="themeToggle"
              color="default"
            />
          }
          label={mode === "light" ? "Light Mode" : "Dark Mode"}
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
