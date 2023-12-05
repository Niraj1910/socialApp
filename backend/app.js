const express = require("express");
const parser = require("cookie-parser");
const cors = require("cors");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// Using Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(parser());

// Enable CORS for all routes
app.use(cors());

// Set Content Security Policy headers dynamically
app.use((req, res, next) => {
  const backendUrl = `${req.protocol}://${req.get("host")}`;
  res.setHeader(
    "Content-Security-Policy",
    `default-src 'self'; font-src 'self' ${backendUrl};`
  );
  return next();
});

// Importing Routes
const post = require("./routes/post");
const user = require("./routes/user");

// Using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);

module.exports = app;
