import { Request, Response } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} from "../services/bookService";

import { successResponse, errorResponse } from "../models/responseModel";

/**
 * Create Book Controller
 */
export const createBookController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.body.title) {
      res.status(400).json(errorResponse("Title is required"));
      return;
    }

    const newBook = await createBook(req.body);

    res
      .status(201)
      .json(successResponse(newBook, "Book created successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse("Failed to create book"));
  }
};

/**
 * Get All Books Controller
 */
export const getAllBooksController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const books = await getAllBooks();
    res.status(200).json(successResponse(books, "Books fetched"));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse("Error fetching books"));
  }
};

/**
 * Get Book By ID Controller
 */
export const getBookByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const book = await getBookById(id);

    if (!book) {
      res.status(404).json(errorResponse("Book not found"));
      return;
    }

    res.status(200).json(successResponse(book));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse("Failed to fetch book"));
  }
};

/**
 * Update Book Controller
 */
export const updateBookController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await updateBookById(id, req.body);

    res.status(200).json(successResponse(null, "Book updated"));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse("Failed to update book"));
  }
};

/**
 * Delete Book Controller
 */
export const deleteBookController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await deleteBookById(id);

    if (result.ok) {
      res.status(200).json(successResponse(result.data, "Book deleted"));
      return;
    }

    if (result.code === "NOT_FOUND") {
      res.status(404).json(errorResponse(result.message));
      return;
    }

    res.status(500).json(errorResponse("Something went wrong"));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorResponse("Failed to delete book"));
  }
};
