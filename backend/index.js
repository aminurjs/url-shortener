import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    // credentials: true,
  })
);

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to our web app!" });
});

app.use((req, res) => {
  res.status(404).send({ message: "404 Not Found." });
});

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
