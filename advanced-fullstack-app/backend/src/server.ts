import app from "./app.js";
import { env } from "./config/env.js";
import { pool } from "./db/pool.js";

const startServer = async () => {
  try {
    // ---------------------------------------------------------
    // Test PostgreSQL connection
    // ---------------------------------------------------------

    await pool.query("SELECT NOW()");

    console.log("✅ PostgreSQL connected successfully");

    // ---------------------------------------------------------
    // Start Express server
    // ---------------------------------------------------------

    app.listen(env.PORT, () => {
      console.log(
        `🚀 Server running at http://localhost:${env.PORT}`,
      );
    });
  } catch (error) {
    console.error(
      "❌ Database connection failed:",
      error,
    );

    process.exit(1);
  }
};

startServer();