import type {
  ErrorRequestHandler,
} from "express";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  console.error("❌ Error:", error);

  if (error instanceof Error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};