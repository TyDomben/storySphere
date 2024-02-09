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
