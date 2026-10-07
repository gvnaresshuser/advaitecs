import { Router } from "express";

import { authController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  loginSchema,
  registerSchema,
} from "../validators/auth.validator.js";

const router = Router();

router.post(
  "/register",
  validate(registerSchema, "body"),
  authController.register,
);

router.post(
  "/login",
  validate(loginSchema, "body"),
  authController.login,
);

router.get(
  "/me",
  authMiddleware,
  authController.getCurrentUser,
);

router.post(
  "/logout",
  authController.logout,
);

export default router;