import { Request, Response } from "express";
import { User } from "../models/userModel"; 

let users: User[] = [];

/**
 * Retrieve all users
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllUsers = (req: Request, res: Response): void => {
  res.status(200).json({ message: "Users retrieved", data: users });
};

/**
 * Retrieve a user by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const getUserById = (req: Request, res: Response): void => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found" }); 
    return;
  }
  res.status(200).json({ message: "User found", data: user });
};




