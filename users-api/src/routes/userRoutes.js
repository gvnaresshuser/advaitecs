
import express from "express";

import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  removeUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);//http://localhost:5000/api/users
router.get("/:id", getUser);//http://localhost:5000/api/users/3
router.post("/", addUser);//http://localhost:5000/api/users
router.put("/:id", updateUser);//http://localhost:5000/api/users/1
router.delete("/:id", removeUser);//http://localhost:5000/api/users/1

export default router;

