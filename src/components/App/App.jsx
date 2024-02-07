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
import DetailedStoryView from "../DetailedStoryView/DetailedStoryView";
import Desk from "../Desk/Desk.jsx";
import EditStoryPage from "../EditStoryPage/EditStoryPage";
// import AdminDashboard from "../AdminDashboard/AdminDashboard";
import Gallery from "../Gallery/Gallery";

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
      <CssBaseline />
      <Router>
        <Nav />
        <Switch>
          {/* Define the root path to render the LandingPage */}
          <Route exact path="/" component={LandingPage} />
          {/* Remove Redirect from "/home" to "/", as it is unnecessary */}
          
          {/* Define other specific routes */}
          <Route exact path="/about" component={AboutPage} />
          <ProtectedRoute exact path="/user" component={UserPage} />
          <Route exact path="/login" render={() => (user.id ? <Redirect to="/user" /> : <LoginPage />)} />
          <Route exact path="/registration" render={() => (user.id ? <Redirect to="/user" /> : <RegisterPage />)} />
          {/* Remove the duplicate "/home" route as it is the same as the root "/" */}
          
          <ProtectedRoute exact path="/gallery" component={Gallery} />
          <Route exact path="/gallery/:storyId" component={DetailedStoryView} />
          <Route exact path="/edit/:storyId" component={EditStoryPage} />
          <ProtectedRoute exact path="/desk" component={Desk} />
          
          {/* Fallback route for 404 Not Found */}
          <Route render={() => <h1>404 - Page Not Found</h1>} />
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;