import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const addDataSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("MANAGER", "CASHIER").optional(),
});

const editDataSchema = Joi.object({
  email: Joi.string().email().optional(),
  name: Joi.string().optional(),
  password: Joi.string().min(8).optional(),
  role: Joi.string().valid("MANAGER", "CASHIER").optional(),
});

export const verifyAddUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { error } = addDataSchema.validate(request.body, { abortEarly: false });

  if (error) {
    return response
      .json({
        status: false,
        message: error.details.map((err) => err.message).join(),
      })
      .status(400);
  }

  return next();
};

export const verifyEditUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { error } = editDataSchema.validate(request.body, {
    abortEarly: false,
  });

  if (error) {
    return response
      .json({
        status: false,
        message: error.details.map((err) => err.message).join(),
      })
      .status(400);
  }

  return next();
};
