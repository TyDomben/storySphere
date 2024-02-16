/**
 * Entry Point for a React and Redux Application
 *
 * This script serves as the entry point for a React application, utilizing Redux for state management. It is responsible for initializing the application's root component and integrating the Redux store with the React component tree.
 *
 * Overview:
 * - Imports the necessary modules from React and ReactDOM for rendering the application.
 * - Integrates Redux by wrapping the root application component with the <Provider> component, passing the Redux store as a prop to make it available throughout the application.
 * - Utilizes React.StrictMode for highlighting potential problems in an application. It activates additional checks and warnings for its descendants.
 * - Renders the <App /> component as the root of the application, enabling the entire application to access the Redux store.
 *
 * Key Components:
 * - React: A JavaScript library for building user interfaces.
 * - ReactDOM: Provides DOM-specific methods that can be used at the top level of a web app to enable an efficient way of managing DOM elements.
 * - Provider: A React component provided by react-redux that allows Redux to be used in a React application. It makes the Redux store available to any nested components that need to access the Redux store.
 * - store: The Redux store that holds the complete state tree of the application.
 * - App: The root component of the application that is wrapped by <Provider> to ensure all child components can access the Redux store.
 *
 * Usage:
 * - Ensure you have a div with id="react-root" in your index.html file as the mount point for the React application.
 * - The Redux store should be configured and exported from "./redux/store".
 * - The <App /> component should be defined in "./components/App/App" and will serve as the main component for your application.
 *
 * Example index.html mount point:
 * ```html
 * <div id="react-root"></div>
 * ```
 *
 * Future Enhancements:
 * - Implement lazy loading for the App component and other parts of the application to improve performance.
 * - Explore integrating new React features or hooks for state management and side-effects handling.
 *
 * Dependencies:
 * - React and ReactDOM for rendering the application.
 * - React-redux for integrating Redux with React components.
 *
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./redux/store";

import App from "./components/App/App";

const root = ReactDOM.createRoot(document.getElementById("react-root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
