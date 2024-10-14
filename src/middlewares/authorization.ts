import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from "../global";
import { verify } from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
  name: string;
  role: string;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      status: false,
      message: "Access denied. No token provided",
    });
  }

  try {
    const secretKey = SECRET_KEY || "";
    const decoded = verify(token, secretKey);
    req.body.user = decoded as JwtPayload;
    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Token is invalid",
    });
  }
};

export const verifyRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }
    if (!allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: "You are not allowed to access this resource" });
    }
    next();
  };
};
