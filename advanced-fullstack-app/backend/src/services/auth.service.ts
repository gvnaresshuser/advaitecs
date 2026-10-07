import { userRepository } from "../repositories/user.repository.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

export const authService = {
  // ---------------------------------------------------------
  // Find user by email
  // ---------------------------------------------------------

  async findUserByEmail(email: string) {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      throw new Error("Email is required");
    }

    return userRepository.findByEmail(normalizedEmail);
  },

  // ---------------------------------------------------------
  // Find user by ID
  // ---------------------------------------------------------

  async findUserById(id: string) {
    if (!id.trim()) {
      throw new Error("User ID is required");
    }

    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },

  // ---------------------------------------------------------
  // Register user
  // ---------------------------------------------------------

  async registerUser(
    name: string,
    email: string,
    password: string,
  ) {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    // -------------------------------------------------------
    // Validate input
    // -------------------------------------------------------

    if (!normalizedName) {
      throw new Error("Name is required");
    }

    if (!normalizedEmail) {
      throw new Error("Email is required");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    if (password.length < 6) {
      throw new Error(
        "Password must be at least 6 characters long",
      );
    }

    // -------------------------------------------------------
    // Check whether email already exists
    // -------------------------------------------------------

    const existingUser =
      await userRepository.findByEmail(normalizedEmail);

    if (existingUser) {
      throw new Error(
        "User with this email already exists",
      );
    }

    // -------------------------------------------------------
    // Hash password
    // -------------------------------------------------------

    const passwordHash = await hashPassword(password);

    // -------------------------------------------------------
    // Create user
    // -------------------------------------------------------

    const user = await userRepository.createUser(
      normalizedName,
      normalizedEmail,
      passwordHash,
    );

    // -------------------------------------------------------
    // Never return password hash
    // -------------------------------------------------------

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    };
  },

  // ---------------------------------------------------------
  // Login user
  // ---------------------------------------------------------

  async loginUser(
    email: string,
    password: string,
  ) {
    const normalizedEmail = email.trim().toLowerCase();

    // -------------------------------------------------------
    // Validate input
    // -------------------------------------------------------

    if (!normalizedEmail) {
      throw new Error("Email is required");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    // -------------------------------------------------------
    // Find user
    // -------------------------------------------------------

    const user =
      await userRepository.findByEmail(normalizedEmail);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // -------------------------------------------------------
    // Compare password
    // -------------------------------------------------------

    const passwordMatches = await comparePassword(
      password,
      user.password_hash,
    );

    if (!passwordMatches) {
      throw new Error("Invalid email or password");
    }

    // -------------------------------------------------------
    // Generate JWT
    // -------------------------------------------------------

    const token = generateToken(user.id);

    // -------------------------------------------------------
    // Return safe authentication result
    // -------------------------------------------------------

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  },

  // ---------------------------------------------------------
  // Get authenticated user
  // ---------------------------------------------------------

  async getCurrentUser(id: string) {
    const user = await this.findUserById(id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },
};