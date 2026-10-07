import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../schemas/user.schema.js";

const router = Router();

// ---------------------------------------------------------
// User routes
// ---------------------------------------------------------

router.get("/", userController.getAllUsers);

router.post(
  "/",
  validate(createUserSchema),
  userController.createUser,
);

router.put(
  "/:id",
  validate(updateUserSchema),
  userController.updateUser,
);

router.delete("/:id",userController.deleteUser);

router.get(
  "/profiles",
  userController.getUsersWithProfiles,
);

router.get(
  "/roles",
  userController.getUsersWithRoles,
);

router.get(
  "/pagination",
  userController.getUsersPaginated,
);

router.get(
  "/email/:email",
  userController.getUserByEmail,
);

router.get(
  "/:id",
  userController.getUserById,
);

export default router;