import { Request, Response } from "express";
import {
  getAllBorrowsService,
  borrowBookService,
  returnBookService,
} from "../services/borrowService";

/**
 * Retrieve all borrow records
 */
export const getAllBorrowsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const borrows = await getAllBorrowsService();
    res
      .status(200)
      .json({ message: "Borrow records retrieved", data: borrows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve borrow records" });
  }
};

/**
 * Borrow a book
 */
export const borrowBookController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bookId, userId } = req.body;

    if (!bookId || !userId) {
      res.status(400).json({ message: "bookId and userId are required" });
      return;
    }

    const newBorrow = await borrowBookService(bookId, userId);

    res
      .status(201)
      .json({ message: "Book borrowed successfully", data: newBorrow });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to borrow book" });
  }
};

/**
 * Return a borrowed book
 */
export const returnBookController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await returnBookService(id);

    if (!result.ok) {
      if (result.code === "NOT_FOUND") {
        res.status(404).json({ message: result.message });
        return;
      }
      res.status(400).json({ message: result.message });
      return;
    }

    res.status(200).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to return book" });
  }
};
