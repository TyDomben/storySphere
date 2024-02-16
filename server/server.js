/**
 * Server Configuration for a Full-Stack JavaScript Application
 *
 * This file configures an Express server for a full-stack application, integrating essential middleware for session management, authentication, and serving static files. It also sets up API routes and a catch-all route to support a single-page application (SPA) architecture.
 *
 * Key Features:
 * - Utilizes Express.js as the web server framework to handle HTTP requests and responses.
 * - Configures environment variables, including the server port, using dotenv.
 * - Integrates session middleware and passport for user authentication and session management.
 * - Defines API routes for user, images, and text data, with placeholders for future route expansions.
 * - Serves static files from the 'build' directory, enabling the hosting of a React SPA.
 * - Implements a catch-all route to redirect all unmatched requests to the SPA, facilitating client-side routing.
 *
 * Middleware Configuration:
 * - express.json() and express.urlencoded({ extended: true }) for parsing JSON and URL-encoded data.
 * - express.static("build") to serve static files, such as the React application build.
 * - Session middleware for maintaining server-side sessions.
 * - Passport initialization and session handling for authentication.
 *
 * API Routes:
 * - /api/user for user-related operations (authentication, profile management, etc.).
 * - /api/images for image data management.
 * - /api/text for text data management.
 * - A commented-out placeholder for /api/audio, indicating planned support for audio data.
 *
 * Catch-all Route:
 * - A catch-all route is defined to serve the index.html file for any unmatched routes, supporting the SPA's client-side routing.
 *
 * Server Initialization:
 * - The server listens on a port specified by an environment variable or defaults to 5001, displaying the listening port in the console.
 *
 * Usage:
 * - This server setup is designed for applications that require user authentication, session management, and the handling of various data types (users, images, text, potentially audio).
 * - To integrate additional routes or middleware, follow the existing patterns for modularization and separation of concerns.
 *
 * Future Enhancements:
 * - Implement HTTPS support for secure data transmission.
 * - Expand the API to include more data types and functionalities as required by the application.
 * - Integrate a more sophisticated logging mechanism for better monitoring and debugging.
 *
 * Dependencies:
 * - Express for the server framework.
 * - dotenv for environment variable management.
 * - Passport for authentication.
 * - Additional custom middleware and routers for session management and API endpoints.
 *
 */

const express = require("express");
const path = require("path"); // added when transitioning to browser router
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route Includes
const userRouter = require("./routes/user.router");
const imagesRouter = require("../server/routes/image.router");
const textRouter = require("../server/routes/text.router");
// const audioRouter = require("../server/routes/audio.router");

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("build"));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
// TODO add more routes here
app.use("/api/user", userRouter);
// app.use("/api/audio", audioRouter);
app.use("/api/images", imagesRouter);
app.use("/api/text", textRouter);

// !Catch-all route to serve React app for unmatched routes
// !AFTER API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
