import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser as updateUserModel,
  deleteUser,
} from "../models/userModel.js";

// GET /api/users
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

// GET /api/users/:id
export const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};

// POST /api/users
export const addUser = async (req, res) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create user",
    });
  }
};

// PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const user = await updateUserModel(
      req.params.id,
      req.body
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update user",
    });
  }
};

// DELETE /api/users/:id
export const removeUser = async (req, res) => {
  try {
    const user = await deleteUser(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};

