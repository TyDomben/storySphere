/**
 * App Component
 * 
 * This component acts as the main entry point for the application, orchestrating the routing and theming across the app.
 * It utilizes React Router for navigation between different parts of the application and MUI's ThemeProvider to apply a consistent theme.
 * 
 * Key Features:
 * - Dynamic theme switching: Users can toggle between light and dark modes for a personalized experience.
 * - Protected routes: Some routes are protected and only accessible to authenticated users, ensuring privacy and security.
 * - Centralized routing: All application routes are defined here, making it easy to manage and update navigational flows.
 * 
 * Potential Enhancements:
 * - Implementing a more detailed 404 page to improve user experience on invalid routes.
 * - Considering making the gallery public to enhance the app's public-facing features and attract more users.
 * 
 * Usage of `CssBaseline` from MUI ensures a consistent baseline across browsers.
 * The theme (light or dark) is stored in local state and can be toggled by the user, affecting the entire application's appearance.
 */
import React, { useEffect, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
// https://mui.com/material-ui/react-css-baseline/
import { lightTheme, darkTheme } from "../../theme/theme.js";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import DetailedStoryPage from "../DetailedStoryPage/DetailedStoryPage.jsx";
import Desk from "../Desk/Desk.jsx";
import EditStoryPage from "../EditStoryPage/EditStoryPage";
// import AdminDashboard from "../AdminDashboard/AdminDashboard";
import Gallery from "../Gallery/Gallery";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  // Set the initial theme mode to light
  const [mode, setMode] = useState("light");

  // Toggle theme mode
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Fetch user data from the database
  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Router>
        <Nav toggleTheme={toggleTheme} /> {/* Pass toggleTheme as a prop */}
        <Switch>
          {/* Define the root path to render the LandingPage */}
          <Route exact path="/" component={LandingPage} />
          {/* Define other specific routes */}
          <Route exact path="/about" component={AboutPage} />
          <ProtectedRoute exact path="/user" component={UserPage} />
          <Route
            exact
            path="/login"
            render={() => (user.id ? <Redirect to="/user" /> : <LoginPage />)}
          />
          <Route
            exact
            path="/registration"
            render={() =>
              user.id ? <Redirect to="/user" /> : <RegisterPage />
            }
          />
          {/* //? consider un-protecting gallery?  that would make this more alluring - more public facing*/}
          <ProtectedRoute exact path="/gallery" component={Gallery} />
          <ProtectedRoute
            exact
            path="/gallery/:storyId"
            component={DetailedStoryPage}
          />
          <ProtectedRoute
            exact
            path="/edit/:storyId"
            component={EditStoryPage}
          />
          <ProtectedRoute exact path="/desk" component={Desk} />

          {/* Fallback route for 404 Not Found */}
          {/* // TODO  update fallback to be a more comprehensive page*/}
          <Route render={() => <h1>404 - Page Not Found</h1>} />
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
