import Joi from "joi";
/**
 * @openapi
 * components:
 *   schemas:
 *     Borrow:
 *       type: object
 *       required:
 *         - id
 *         - bookId
 *         - userId
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           example: "borrow123"
 *         bookId:
 *           type: string
 *           example: "book_123"
 *         userId:
 *           type: string
 *           example: "user_456"
 *         status:
 *           type: string
 *           enum: [BORROWED, RETURNED]
 *           example: "BORROWED"
 *         returnDate:
 *           type: string
 *           format: date-time
 *           example: "2024-03-01T00:00:00Z"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T10:30:00Z"
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBorrowRequest:
 *       type: object
 *       required:
 *         - bookId
 *         - userId
 *         - status
 *       properties:
 *         bookId:
 *           type: string
 *           example: "book_123"
 *         userId:
 *           type: string
 *           example: "user_456def"
 *         status:
 *           type: string
 *           enum: [BORROWED, RETURNED]
 *           example: "BORROWED"
 *       description: Payload required to create a borrow record
 */
export const createBorrowSchema = Joi.object({
  bookId: Joi.string().required(),
  userId: Joi.string().required(),
  status: Joi.string().valid("BORROWED", "RETURNED").required(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateBorrowRequest:
 *       type: object
 *       description: Payload to update a borrow record
 *       properties:
 *         status:
 *           type: string
 *           Interfaces: [BORROWED, RETURNED]
 *           example: "RETURNED"
 *         returnDate:
 *           type: string
 *           format: date
 *           example: "2024-03-01"
 *       minProperties: 1
 */
export const updateBorrowSchema = Joi.object({
  status: Joi.string().valid("BORROWED", "RETURNED"),
  returnDate: Joi.date(),
}).min(1);

/**
 * @openapi
 * components:
 *   schemas:
 *     BorrowIdParam:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the borrow record
 *           example: "borrow"
 */
export const idParamSchema = Joi.object({
  id: Joi.string().required(),
});