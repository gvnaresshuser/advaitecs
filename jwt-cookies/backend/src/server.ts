import app from "./app.js";
import { env } from "./config/env.js";

const startServer = async (): Promise<void> => {
  try {
    app.listen(env.port, () => {
      console.log(
        `Server running at http://localhost:${env.port}`,
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

void startServer();