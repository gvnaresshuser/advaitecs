import express from "express";
import cors from "cors";

import { env } from "./config/env.js";
import joinRoutes from "./routes/join.routes.js";

import { notFoundMiddleware } from "./middleware/not-found.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";


const app = express();


// ============================================================
// MIDDLEWARE
// ============================================================

app.use(
  cors({
    origin: env.frontendUrl,
  })
);

app.use(express.json());


// ============================================================
// ROOT
// ============================================================

app.get("/", (_req, res) => {
  res.json({
    message: "PostgreSQL JOIN Demonstration API",
  });
});


// ============================================================
// JOIN ROUTES
// ============================================================

app.use("/api/joins", joinRoutes);


// ============================================================
// 404
// ============================================================

app.use(notFoundMiddleware);


// ============================================================
// ERROR HANDLING
// ============================================================

app.use(errorMiddleware);


export default app;