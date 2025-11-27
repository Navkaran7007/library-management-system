import { Router } from "express";
import {
  createReviewController,
  getBookReviewsController,
  updateReviewController,
  deleteReviewController,
} from "../controllers/reviewController";

const router = Router();

router.post("/reviews", createReviewController);
router.get("/books/:bookId/reviews", getBookReviewsController);
router.put("/reviews/:id", updateReviewController);
router.delete("/reviews/:id", deleteReviewController);

export default router;
