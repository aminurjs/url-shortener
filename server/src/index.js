import express from "express";
import cors from "cors";
import session from "express-session";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser"; // Add this import

import { connectDB } from "./config/database.js";
import { configurePassport } from "./config/passport.js";
import { environment } from "./config/environment.js";
import authRoutes from "./routes/auth.routes.js";

// Connect to database
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(helmet()); // Helps secure Express apps by setting various HTTP headers
app.use(
  cors({
    origin: environment.cors.origin,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

// Sanitize inputs to prevent NoSQL injection
app.use(mongoSanitize());

// Session middleware (required for passport)
app.use(
  session({
    secret: environment.jwt.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: environment.nodeEnv === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize Passport
const passport = configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: environment.nodeEnv === "development" ? err.message : {},
  });
});

// Start server
const PORT = environment.port;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//Home page
app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to our web app!" });
});

//404 Route
app.use((req, res) => {
  res.status(404).send({ message: "404 Not Found." });
});

export default app;
