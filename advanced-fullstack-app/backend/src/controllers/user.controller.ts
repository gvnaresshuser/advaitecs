import type { Request, Response, NextFunction } from "express";

import { userService } from "../services/user.service.js";

export const userController = {
  // ---------------------------------------------------------
  // GET /api/users
  // ---------------------------------------------------------

  async getAllUsers(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const users = await userService.getAllUsers();

      res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // GET /api/users/:id
  // ---------------------------------------------------------

async getUserById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
},

  // ---------------------------------------------------------
  // GET /api/users/email/:email
  // ---------------------------------------------------------

  async getUserByEmail(
  req: Request<{ email: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email } = req.params;

    const user =
      await userService.getUserByEmail(email);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
},

  // ---------------------------------------------------------
  // GET /api/users/profiles
  // ---------------------------------------------------------

  async getUsersWithProfiles(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const users =
        await userService.getUsersWithProfiles();

      res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // GET /api/users/roles
  // ---------------------------------------------------------

  async getUsersWithRoles(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const users =
        await userService.getUsersWithRoles();

      res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // GET /api/users/pagination?page=1&limit=5
  // ---------------------------------------------------------

  async getUsersPaginated(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result =
        await userService.getUsersPaginated(
          page,
          limit,
        );

      res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  },

  async createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const user =
      await userService.createUser(
        name,
        email,
        password,
      );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
},

async updateUser(req:Request<{id:string}>,res:Response,next:NextFunction){
  try{
    const {id}=req.params;
    const {name,email}=req.body;
    const user=await userService.updateUser(id,name,email);
    res.json({
      success:true,
      message:"User updated successfully",
      data:user,
    });
  }catch(error){
    next(error);
  }
},

async deleteUser(
  req:Request<{id:string}>,
  res:Response,
  next:NextFunction,
){
  try{
    const {id}=req.params;
    const user=await userService.deleteUser(id);

    res.json({
      success:true,
      message:"User deleted successfully",
      data:user,
    });
  }catch(error){
    next(error);
  }
},
};