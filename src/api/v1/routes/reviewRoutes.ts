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
import isAuthorized from "../middleware/authorize";

const router = Router();

router.post("/reviews", 
  authenticate,
  validateBody(createReviewSchema),
  isAuthorized({ hasRole: ["User","Admin","Librarian"
  ] }),
  createReviewController);
router.get("/books/:bookId/reviews", 
  authenticate,
  isAuthorized({ hasRole: ["Admin","Librarian"] }),
  getBookReviewsController);
router.put("/reviews/:id", 
  authenticate,
  isAuthorized({ hasRole: ["User","Admin","Librarian"] }),
  validateParams(idParamSchema),
  validateBody(updateReviewSchema),
  updateReviewController);
router.delete("/reviews/:id", 
  authenticate,
  isAuthorized({ hasRole: ["Admin","Librarian"] }),
  validateParams(idParamSchema),
  deleteReviewController);

export default router;
