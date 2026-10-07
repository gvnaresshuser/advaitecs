import type { RequestHandler } from "express";
import type { ZodType } from "zod";

export const validate = (
  schema: ZodType,
): RequestHandler => {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => issue.message)
        .join(", ");

      const error = new Error(message);

      (error as Error & { statusCode?: number }).statusCode = 400;

      return next(error);
    }

    req.body = result.data;

    next();
  };
};