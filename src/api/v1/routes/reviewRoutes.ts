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
/**
 * @openapi
 * /api/v1/reviews:
 *   post:
 *     summary: Create a new review for a book
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReviewRequest'
 *     responses:
 *       '201':
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *       '400':
 *         description: Validation error
 *       '403':
 *         description: Only User, Librarian, or Admin can create reviews
 */
router.post("/reviews", 
  authenticate,
  validateBody(createReviewSchema),
  isAuthorized({ hasRole: ["User","Admin","Librarian"
  ] }),
  createReviewController);

/**
 * @openapi
 * /api/v1/books/{bookId}/reviews:
 *   get:
 *     summary: Retrieve all reviews for a specific book
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to get reviews for
 *     responses:
 *       '200':
 *         description: Successfully retrieved book reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reviews retrieved"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *       '403':
 *         description: Only Admin or Librarian can view all reviews
 */
router.get("/books/:bookId/reviews", 
  authenticate,
  isAuthorized({ hasRole: ["Admin","Librarian"] }),
  getBookReviewsController);

/**
 * @openapi
 * /api/v1/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateReviewRequest'
 *     responses:
 *       '200':
 *         description: Review updated successfully
 *       '400':
 *         description: Validation error
 *       '403':
 *         description: Only User, Librarian, or Admin may update reviews
 *       '404':
 *         description: Review not found
 */
router.put("/reviews/:id", 
  authenticate,
  isAuthorized({ hasRole: ["User","Admin","Librarian"] }),
  validateParams(idParamSchema),
  validateBody(updateReviewSchema),
  updateReviewController);

/**
 * @openapi
 * /api/v1/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review to delete
 *     responses:
 *       '200':
 *         description: Review deleted successfully
 *       '403':
 *         description: User, Admin or Librarian may delete reviews
 *       '404':
 *         description: Review not found
 */
router.delete("/reviews/:id", 
  authenticate,
  isAuthorized({ hasRole: ["User","Admin","Librarian"] }),
  validateParams(idParamSchema),
  deleteReviewController);

export default router;
