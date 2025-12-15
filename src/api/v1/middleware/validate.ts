import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export const validateBody = (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        details: error.details.map(d => d.message),
      });
    }

    req.body = value;
    next();
  };

export const validateParams = (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        details: error.details.map(d => d.message),
      });
    }

    req.params = value;
    next();
  };