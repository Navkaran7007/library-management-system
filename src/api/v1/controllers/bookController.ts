import { Request, Response } from "express";
import { Book } from "../models/bookModel"; 

let books: Book[] = [];

/**
 * Create a new book
 * @param req - Express request object
 * @param res - Express response object
 */
export const createBook = (req: Request, res: Response): void => {
  const newBook: Book = {
    id: String(Date.now()),
    title: req.body.title,
    author: req.body.author,
    available: req.body.available,
    updatedEdition: req.body.updatedEdition,
  };
  books.push(newBook);
  res.status(201).json({ message: "Book created", data: newBook });
};

/**
 * Retrieve all books
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllBooks = (req: Request, res: Response): void => {
  res.status(200).json({ message: "Books retrieved", data: books });
};

/**
 * Retrieve a book by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const getBookById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const book = books.find((b) => b.id === id);
  if (!book) {
    res.status(404).json({ message: "Book not found" });
    return;
  }
  res.status(200).json({ message: "Book found", data: book });
};

/**
 * Update a book by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateBook = (req: Request, res: Response): void => {
  const { id } = req.params;

  const idx = books.findIndex((b) => b.id === id);
  if (idx === -1) {
    res.status(404).json({ message: "Book not found" });
    return;
  }

  const updatedBook: Book = {
    id: books[idx].id, 
    title: req.body.title,
    author: req.body.author,
    available: req.body.available,
    updatedEdition: req.body.updatedEdition,
  };

  books[idx] = updatedBook;

  res.status(200).json({
    message: "Book updated",
    data: updatedBook,
  });
};

/**
 * Delete a book by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteBook = (req: Request, res: Response): void => {
  const { id } = req.params;
  const idx = books.findIndex((b) => b.id === id);
  if (idx === -1) {
    res.status(404).json({ message: "Book not found" });
    return;
  }
  books.splice(idx, 1);
  res.status(200).json({ message: "Book deleted" });
};
