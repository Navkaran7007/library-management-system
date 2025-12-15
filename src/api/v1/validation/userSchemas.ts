import Joi from "joi";
/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - displayName
 *         - email
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           example: "user7007"
 *         displayName:
 *           type: string
 *           example: "Nav"
 *         email:
 *           type: string
 *           format: email
 *           example: "Nav@example.com"
 *         role:
 *           type: string
 *           enum: [ADMIN, LIBRARIAN, MEMBER]
 *           example: "MEMBER"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T10:30:00Z"
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - displayName
 *         - email
 *         - role
 *       properties:
 *         displayName:
 *           type: string
 *           description: The user's display name
 *           example: "Nav"
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "Nav@example.com"
 *         role:
 *           type: string
 *           enum: [ADMIN, LIBRARIAN, MEMBER]
 *           description: Role assigned to the user
 *           example: "MEMBER"
 *       description: Required to create a new user
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - displayName
 *         - email
 *         - role
 *       properties:
 *         displayName:
 *           type: string
 *           description: The user's display name
 *           example: "Nav"
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "Nav@example.com"
 *         role:
 *           type: string
 *           enum: [ADMIN, LIBRARIAN, USER]
 *           description: Role assigned to the user
 *           example: "USER"
 *       description: Required to create a new user
 */
export const createUserSchema = Joi.object({
  displayName: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  role: Joi.string().valid("Admin", "Librarian", "User").required(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateUserRequest:
 *       type: object
 *       description: Update one or more user fields
 *       properties:
 *         displayName:
 *           type: string
 *           example: "Updated Name"
 *         email:
 *           type: string
 *           format: email
 *           example: "updated@example.com"
 *         role:
 *           type: string
 *           enum: [ADMIN, LIBRARIAN, USER]
 *           example: "LIBRARIAN"
 *       minProperties: 1
 */
export const updateUserSchema = Joi.object({
  displayName: Joi.string().trim(),
  email: Joi.string().email().trim(),
  role: Joi.string().valid("Admin", "Librarian", "User"),
}).min(1);

/**
 * @openapi
 * components:
 *   schemas:
 *     UserIdParam:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique identifier
 *           example: "user7007"
 */
export const idParamSchema = Joi.object({
  id: Joi.string().required(),
});