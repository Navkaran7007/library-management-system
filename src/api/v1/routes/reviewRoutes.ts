import { Router } from "express";
import {
  createReviewController,
  getBookReviewsController,
  updateReviewController,
  deleteReviewController,
} from "../controllers/reviewController";
import authenticate from "../middleware/authenticate";

const router = Router();

router.post("/reviews",authenticate, createReviewController);
router.get("/books/:bookId/reviews", authenticate,getBookReviewsController);
router.put("/reviews/:id", authenticate,updateReviewController);
router.delete("/reviews/:id", authenticate,deleteReviewController);

export default router;
