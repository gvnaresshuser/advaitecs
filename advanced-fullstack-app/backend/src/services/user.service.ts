import { userRepository } from "../repositories/user.repository.js";
import { hashPassword } from "../utils/password.js";
export const userService = {
  // ---------------------------------------------------------
  // Get all users
  // ---------------------------------------------------------

  async getAllUsers() {
    return userRepository.findAll();
  },

  // ---------------------------------------------------------
  // Get user by ID
  // ---------------------------------------------------------

  async getUserById(id: string) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },

  // ---------------------------------------------------------
  // Get user by email
  // ---------------------------------------------------------

  async getUserByEmail(email: string) {
    return userRepository.findByEmail(email);
  },

  // ---------------------------------------------------------
  // Get users with profiles
  // ---------------------------------------------------------

  async getUsersWithProfiles() {
    return userRepository.findUsersWithProfiles();
  },

  // ---------------------------------------------------------
  // Get users with roles
  // ---------------------------------------------------------

  async getUsersWithRoles() {
    return userRepository.findUsersWithRoles();
  },

  // ---------------------------------------------------------
  // Pagination
  // ---------------------------------------------------------

  async getUsersPaginated(page: number, limit: number) {
    if (page < 1) {
      throw new Error("Page must be greater than or equal to 1");
    }

    if (limit < 1 || limit > 100) {
      throw new Error("Limit must be between 1 and 100");
    }

    const users = await userRepository.findPaginated(page, limit);

    const total = await userRepository.countUsers();

    const totalPages = Math.ceil(total / limit);

    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  },

  async createUser(
  name: string,
  email: string,
  password: string,
) {
  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser =
    await userRepository.findByEmail(
      normalizedEmail,
    );

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const passwordHash =
    await hashPassword(password);

  const user =
    await userRepository.createUser(
      normalizedName,
      normalizedEmail,
      passwordHash,
    );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
  };
},

async updateUser(id:string,name:string,email:string){
  const existingUser=await userRepository.findById(id);
  if(!existingUser) throw new Error("User not found");

  const normalizedName=name.trim();
  const normalizedEmail=email.trim().toLowerCase();

  const emailUser=await userRepository.findByEmail(normalizedEmail);
  if(emailUser&&emailUser.id!==id) throw new Error("Email already registered");

  const user=await userRepository.updateUser(
    id,
    normalizedName,
    normalizedEmail,
  );

  return {
    id:user.id,
    name:user.name,
    email:user.email,
    created_at:user.created_at,
  };
},

async deleteUser(id:string){
  const existingUser=await userRepository.findById(id);

  if(!existingUser) throw new Error("User not found");

  await userRepository.deleteUser(id);

  return {
    id,
    name:existingUser.name,
    email:existingUser.email,
  };
},
};