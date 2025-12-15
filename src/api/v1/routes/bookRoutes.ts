import { Router } from "express";
import {
  createBookController,
  getAllBooksController,
  getBookByIdController,
  updateBookController,
  deleteBookController,
} from "../controllers/bookController";
import authenticate from "../middleware/authenticate";
import { validateBody, validateParams } from "../middleware/validate";
import { createBookSchema, idParamSchema, updateBookSchema } from "../validation/bookSchemas";
import isAuthorized from "../middleware/authorize";
import { limiter } from "../middleware/rateLimiter";

const router = Router();

/**
 * @openapi
 * /api/v1/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - available
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Clean Code"
 *               author:
 *                 type: string
 *                 example: "Robert C. Martin"
 *               available:
 *                 type: boolean
 *                 example: true
 *               updatedEdition:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       '201':
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book created"
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       '400':
 *         description: Invalid request body
 */
router.post("/books",
  limiter,  
  authenticate, 
   isAuthorized({ hasRole: ["User","Admin","Librarian"
  ] }),
  validateBody(createBookSchema),createBookController);

/**
 * @openapi
 * /api/v1/books:
 *   get:
 *     summary: Retrieve all books
 *     tags: [Books]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Books retrieved"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 */
router.get("/books",
  limiter,
   authenticate,
   isAuthorized({ hasRole: ["Admin","Librarian"
  ] }), getAllBooksController);

/**
 * @openapi
 * /api/v1/books/{id}:
 *   get:
 *     summary: Retrieve a book by ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the book
 *     responses:
 *       '200':
 *         description: Successfully retrieved the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book found"
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       '404':
 *         description: Book not found
 */
router.get("/books/:id",
  limiter, 
  authenticate,
   isAuthorized({ hasRole: ["User","Admin","Librarian"] }),
   validateParams(idParamSchema),
   getBookByIdController);

/**
 * @openapi
 * /api/v1/books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - available
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Clean Code (Updated Edition)"
 *               author:
 *                 type: string
 *                 example: "Robert C. Martin"
 *               available:
 *                 type: boolean
 *                 example: true
 *               updatedEdition:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       '200':
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book updated"
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       '404':
 *         description: Book not found
 */
router.put("/books/:id", 
  authenticate, 
  isAuthorized({ hasRole: ["Admin","Librarian"
  ] }),
  validateBody(updateBookSchema),
  updateBookController);

/**
 * @openapi
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the book to delete
 *     responses:
 *       '200':
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book deleted"
 *       '404':
 *         description: Book not found
 */
router.delete("/books/:id",
  authenticate,
  isAuthorized({ hasRole: ["Admin","Librarian"
  ] }), 
  validateParams(idParamSchema),
  deleteBookController);

export default router;
