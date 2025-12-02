import { Router } from "express";
import { getAllBorrowsController, 
    borrowBookController, returnBookController } from "../controllers/borrowController";
import authenticate from "../middleware/authenticate";
import { validateBody } from "../middleware/validate";
import { createBorrowSchema } from "../validation/borrowSchemas";
import isAuthorized from "../middleware/authorize";
import { limiter } from "../middleware/rateLimiter";

const router = Router();

/**
 * @openapi
 * /api/v1/borrow:
 *   get:
 *     summary: Retrieve all borrows
 *     tags: [Borrow]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all borrow 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Borrows retrieved"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Borrow'
 */
router.get("/borrow",
    limiter, 
    authenticate,
    isAuthorized({ hasRole: ["User","Admin", "Librarian"] }),
    getAllBorrowsController); 

/**
 * @openapi
 * /api/v1/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - userId
 *             properties:
 *               bookId:
 *                 type: string
 *                 example: "1"
 *               userId:
 *                 type: string
 *                 example: "2"
 *     responses:
 *       '201':
 *         description: Book borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book borrowed successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Borrow'
 *       '400':
 *         description: Missing bookId or userId
 */
router.post("/borrow", 
    limiter,
    authenticate,
    isAuthorized({ hasRole: ["User","Admin","Librarian"
  ] }), 
    validateBody(createBorrowSchema),borrowBookController);   

/**
 * @openapi
 * /api/v1/return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Borrow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - borrowId
 *             properties:
 *               borrowId:
 *                 type: string
 *                 example: "2"
 *     responses:
 *       '200':
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book returned successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Borrow'
 *       '400':
 *         description: Missing borrowId
 *       '404':
 *         description: Borrow record not found
 */
router.post("/return", authenticate, 
     isAuthorized({ hasRole: ["User"] }),  
     validateBody(createBorrowSchema),
     returnBookController);   

export default router;
