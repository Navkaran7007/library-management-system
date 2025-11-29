import { Router } from "express";
import {
  createReviewController,
  getBookReviewsController,
  updateReviewController,
  deleteReviewController,
} from "../controllers/reviewController";
import authenticate from "../middleware/authenticate";
import { validateBody, validateParams } from "../middleware/validate";
import {
  createReviewSchema,
  updateReviewSchema,
  idParamSchema,
} from "../validation/reviewSchemas";

const router = Router();

router.post("/reviews", validateBody(createReviewSchema),createReviewController);
router.get("/books/:bookId/reviews", authenticate,getBookReviewsController);
router.put("/reviews/:id", authenticate,validateParams(updateReviewSchema),updateReviewController);
router.delete("/reviews/:id", authenticate,validateParams(idParamSchema),deleteReviewController);

export default router;
