import { Request, Response } from "express";
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
} from "../services/userService";
import { User } from "../models/userModel";

/**
 * Retrieve all users
 */
export const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({ message: "Users retrieved", data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

/**
 * Retrieve a user by ID
 */
export const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await getUserByIdService(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User found", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

/**
 * Create a new user
 */
export const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { displayName, email } = req.body;

    if (!displayName || !email) {
      res.status(400).json({ message: "Name and email are required" });
      return;
    }

    const now = new Date();

    const userData: Omit<User, "id"> = {
      displayName,
      email,
      role: "User", 
      createdAt: now,
      updatedAt: now,
    };

    const newUser = await createUserService(userData);

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create user" });
  }
};