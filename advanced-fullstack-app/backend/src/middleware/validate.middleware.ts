import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

type RequestSource = "body" | "query" | "params";

export const validate = (
  schema: ZodType,
  source: RequestSource = "body",
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
      return;
    }

    if (source === "body") {
      req.body = result.data;
    }

    next();
  };
};