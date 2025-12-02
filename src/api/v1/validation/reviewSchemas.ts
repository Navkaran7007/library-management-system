import Joi from "joi";
/**
 * @openapi
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - id
 *         - bookId
 *         - userId
 *         - rating
 *         - comment
 *       properties:
 *         id:
 *           type: string
 *           example: "review123"
 *         bookId:
 *           type: string
 *           example: "book123"
 *         userId:
 *           type: string
 *           example: "user456"
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 *         comment:
 *           type: string
 *           example: "One of the best books!"
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
 *     CreateReviewRequest:
 *       type: object
 *       required:
 *         - bookId
 *         - userId
 *         - rating
 *         - comment
 *       properties:
 *         bookId:
 *           type: string
 *           example: "book123"
 *         userId:
 *           type: string
 *           example: "user456"
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 *         comment:
 *           type: string
 *           example: "One of the best books I've read this year!"
 *       description: Create a review
 */
export const createReviewSchema = Joi.object({
  bookId: Joi.string().required(),
  userId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().trim().required(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateReviewRequest:
 *       type: object
 *       description: Fields of a review
 *       properties:
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 3
 *         comment:
 *           type: string
 *           example: "Updated review: after rereading, some parts felt slow."
 *       minProperties: 1
 */
export const updateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5),
  comment: Joi.string().trim(),
}).min(1);

/**
 * @openapi
 * components:
 *   schemas:
 *     ReviewIdParam:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for a review
 *           example: "review123"
 */
export const idParamSchema = Joi.object({
  id: Joi.string().required(),
});