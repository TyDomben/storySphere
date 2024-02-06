import React, { useEffect, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
// https://mui.com/material-ui/react-css-baseline/
import { lightTheme, darkTheme } from "../../theme/theme.js"
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
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
// import DetailedStoryView from "../DetailedStoryView/DetailedStoryView";
// import EditStoryPage from "../EditStoryPage/EditStoryPage";
// import StoryEditor from "../StoryEditor/StoryEditor";
// import AdminDashboard from "../AdminDashboard/AdminDashboard";
// import Gallery from "../Gallery/Gallery";

function App() {
  const [mode, setMode] = useState("light"); // Manage mode state
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <CssBaseline /> {/* Provides a consistent baseline style */}
      <button onClick={toggleMode}>Toggle Mode</button>
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Routes are now managed by BrowserRouter */}
            <Redirect exact from="/" to="/home" />
            <Route exact path="/about">
              <AboutPage />
            </Route>
            <ProtectedRoute exact path="/user">
              <UserPage />
            </ProtectedRoute>
            <ProtectedRoute exact path="/info">
              <InfoPage />
            </ProtectedRoute>
            <Route exact path="/login">
              {user.id ? <Redirect to="/user" /> : <LoginPage />}
            </Route>
            <Route exact path="/registration">
              {user.id ? <Redirect to="/user" /> : <RegisterPage />}
            </Route>
            <Route exact path="/home">
              {user.id ? <Redirect to="/user" /> : <LandingPage />}
            </Route>
            {/* Add more routes as needed */}
            {/* Fallback route for 404 not found */}
            <Route path="*">
              <h1>404 - Page Not Found</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
