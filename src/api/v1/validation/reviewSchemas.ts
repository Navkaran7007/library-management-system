import Joi from "joi";

export const createReviewSchema = Joi.object({
  bookId: Joi.string().required(),
  userId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().trim().required(),
});

export const updateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5),
  comment: Joi.string().trim(),
}).min(1);

export const idParamSchema = Joi.object({
  id: Joi.string().required(),
});