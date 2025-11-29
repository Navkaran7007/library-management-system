import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string().trim().required(),
  author: Joi.string().trim().required(),
  available: Joi.boolean().required(),
  updatedEdition: Joi.boolean().required(),
});

export const updateBookSchema = Joi.object({
  title: Joi.string().trim(),
  author: Joi.string().trim(),
  available: Joi.boolean(),
  updatedEdition: Joi.boolean(),
}).min(1);