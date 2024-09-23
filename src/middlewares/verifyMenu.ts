import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const addDataSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required().valid("FOOD", "DRINK", "SNACK"),
  description: Joi.string().required(),
  picture: Joi.allow().optional(),
});

const editDataSchema = Joi.object({
  name: Joi.string().optional(),
  price: Joi.number().min(0).optional(),
  category: Joi.string().optional().valid("FOOD", "DRINK", "SNACK"),
  description: Joi.string().optional(),
  picture: Joi.allow().optional(),
});

export const verifyAddMenu = (
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

export const verifyEditMenu = (
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

export const verifyMenuAsync = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await addDataSchema.validateAsync(request.body);
    next();
  } catch (error) {
    return response
      .json({ status: false, message: `There is an error. ${error}` })
      .status(400);
  }
};
