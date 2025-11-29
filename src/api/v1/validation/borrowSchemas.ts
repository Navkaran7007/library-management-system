import Joi from "joi";

export const createBorrowSchema = Joi.object({
  bookId: Joi.string().required(),
  userId: Joi.string().required(),
  status: Joi.string().valid("BORROWED", "RETURNED").required(),
});

export const updateBorrowSchema = Joi.object({
  status: Joi.string().valid("BORROWED", "RETURNED"),
  returnDate: Joi.date(),
}).min(1);

export const idParamSchema = Joi.object({
  id: Joi.string().required(),
});