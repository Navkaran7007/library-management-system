import Joi from "joi";
/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - available
 *         - updatedEdition
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the book
 *           example: "The Book"
 *         author:
 *           type: string
 *           description: Name of the book's author
 *           example: "David"
 *         available:
 *           type: boolean
 *           description: Whether the book is currently available
 *           example: true
 *         updatedEdition:
 *           type: boolean
 *           description: Indicates if the book is the latest or updated edition
 *           example: false
 */
export const createBookSchema = Joi.object({
  title: Joi.string().trim().required(),
  author: Joi.string().trim().required(),
  available: Joi.boolean().required(),
  updatedEdition: Joi.boolean().required(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateBookRequest:
 *       type: object
 *       description: Update fields of book
 *       properties:
 *         title:
 *           type: string
 *         author:
 *           type: string
 *           example: "Update"
 *         available:
 *           type: boolean
 *           example: false
 *         updatedEdition:
 *           type: boolean
 *           example: true
 */
export const updateBookSchema = Joi.object({
  title: Joi.string().trim(),
  author: Joi.string().trim(),
  available: Joi.boolean(),
  updatedEdition: Joi.boolean(),
}).min(1);

/**
 * @openapi
 * components:
 *   schemas:
 *     BookIdParam:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for a book
 *           example: "book7007"
 */
export const idParamSchema = Joi.object({
  id: Joi.string().required(),
});