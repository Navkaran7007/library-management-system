import Joi from "joi";

export const createUserSchema = Joi.object({
  displayName: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  role: Joi.string().valid("ADMIN", "LIBRARIAN", "USER").required(),
});

export const updateUserSchema = Joi.object({
  displayName: Joi.string().trim(),
  email: Joi.string().email().trim(),
  role: Joi.string().valid("ADMIN", "LIBRARIAN", "USER"),
}).min(1);

export const idParamSchema = Joi.object({
  id: Joi.string().required(),
});