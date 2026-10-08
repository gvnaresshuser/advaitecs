import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//>npm i nodemon -D
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes - http://localhost:5000/api/users
app.use("/api/users", userRoutes);

// Home
app.get("/", (req, res) => {
  res.send("Hello Express!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
