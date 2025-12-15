import { Request, Response } from "express";
import {
  createReviewService,
  getBookReviewsService,
  updateReviewService,
  deleteReviewService,
} from "../services/reviewService";
import { successResponse, errorResponse } from "../models/responseModel";


export const createReviewController = async (req: Request, res: Response) => {
  try {
    const { bookId, userId, rating, comment } = req.body;

    if (!bookId || !userId || rating === undefined) {
      return res
        .status(400)
        .json(errorResponse("bookId, userId, and rating are required"));
    }

    const now = new Date();

    const review = await createReviewService({
      bookId,
      userId,
      rating,
      comment,
      createdAt: now,
      updatedAt: now,
    });

    res.status(201).json(successResponse(review, "Review created"));
  } catch (err) {
    res.status(400).json(errorResponse((err as Error).message));
  }
};

export const getBookReviewsController = async (req: Request, res: Response) => {
  try {
    const reviews = await getBookReviewsService(req.params.bookId);
    res.json(successResponse(reviews));
  } catch (err) {
    res.status(500).json(errorResponse("Failed to fetch book reviews"));
  }
};

export const updateReviewController = async (req: Request, res: Response) => {
  try {
    const updated = await updateReviewService(req.params.id, req.body);
    if (!updated) return res.status(404).json(errorResponse("Review not found"));

    res.json(successResponse(updated, "Review updated"));
  } catch (err) {
    res.status(400).json(errorResponse((err as Error).message));
  }
};

export const deleteReviewController = async (req: Request, res: Response) => {
  try {
    const ok = await deleteReviewService(req.params.id);
    if (!ok) return res.status(404).json(errorResponse("Review not found"));

    res.json(successResponse(null, "Review deleted"));
  } catch (err) {
    res.status(500).json(errorResponse("Failed to delete review"));
  }
};
