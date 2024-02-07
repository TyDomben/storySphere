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
      <CssBaseline /> {/* Provides a consistent baseline style */}
      <button onClick={toggleMode}>Toggle Mode</button>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Redirect exact from="/" to="/home" />
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
            <Route
              exact
              path="/home"
              render={() =>
                user.id ? <Redirect to="/user" /> : <LandingPage />
              }
            />
            <ProtectedRoute exact path="/gallery" component={Gallery} />
            <Route path="/gallery/:storyId" component={DetailedStoryView} />
            <Route path="/edit/:storyId" component={EditStoryPage} />

            <ProtectedRoute exact path="/desk" component={Desk} />

            <Route path="*" render={() => <h1>404 - Page Not Found</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
