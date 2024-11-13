import { NextFunction, Response, Request } from "express";
import Joi from "joi";

const orderListSchema = Joi.object({
  menuId: Joi.number().required(),
  quantity: Joi.number().required(),
  note: Joi.string().optional(),
});

const addDataSchema = Joi.object({
  customer: Joi.string().required(),
  table_number: Joi.number().min(0).required(),
  payment_method: Joi.string().valid("CASH", "QRIS").uppercase().required(),
  status: Joi.string().valid("NEW", "PAID", "DONE").uppercase().required(),
  userId: Joi.number().optional(),
  orderlists: Joi.array().items(orderListSchema).min(1).required(),
  user: Joi.optional(),
});

const editDataSchema = Joi.object({
  status: Joi.string().valid("NEW", "PAID", "DONE").uppercase().required(),
  user: Joi.optional(),
});

export const verifyAddOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = addDataSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details.map((err) => err.message).join(),
    });
  }

  return next();
};

export const verifyEditStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = editDataSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details.map((err) => err.message).join(),
    });
  }

  return next();
};
