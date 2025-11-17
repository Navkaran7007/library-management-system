import { Request, Response } from "express";
import { Borrow } from "../models/borrowModel"; 

let borrows: Borrow[] = [];

/**
 * Retrieve all borrow records
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllBorrows = (req: Request, res: Response): void => {
  res.status(200).json({ message: "Borrow records retrieved", data: borrows });
};

/**
 * Borrow a book
 * @param req - Express request object
 * @param res - Express response object
 */
export const borrowBook = (req: Request, res: Response): void => {
  const { bookId, userId } = req.body;

  if (!bookId || !userId) {
    res.status(400).json({ message: "bookId and userId are required" });
    return;
  }

  const newBorrow: Borrow = {
    id: String(Date.now()),
    bookId,
    userId,
    status: "BORROWED",
    borrowedAt: new Date(),
  };

  borrows.push(newBorrow);
  res.status(201).json({ message: "Book borrowed successfully", data: newBorrow });
};

/**
 * Return a borrowed book 
 */
export const returnBook = (req: Request, res: Response): void => {
  const { id } = req.params;

  const idx = borrows.findIndex((b) => b.id === id);

  if (idx === -1) {
    res.status(404).json({ message: "Borrow record not found" })
    return
  }

  // Already returned?
  if (borrows[idx].status === "RETURNED") {
    res.status(400).json({ message: "Book already returned" })
    return
  }

  borrows[idx].status = "RETURNED";
  borrows[idx].returnDate = new Date();

  res.status(200).json({
    message: "Book returned successfully",
    data: borrows[idx],
  });
};