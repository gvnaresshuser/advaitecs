import "dotenv/config";

import cors from "cors";
import express from "express";

import aiRoutes from "./routes/ai.routes.js";

const app = express();

const PORT = process.env.PORT ?? 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use("/api/ai", aiRoutes);

app.listen(PORT, () => {
  console.log(`Stage 5 AI server running on http://localhost:${PORT}`);
});