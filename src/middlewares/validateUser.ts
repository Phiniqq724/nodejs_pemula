import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required().alphanum(),
});

export const validateUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { error } = authSchema.validate(request.body, { abortEarly: false });

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
