import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";
import Authentication from "../models/auth.model";

export const isAuthenticatedUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const getToken = req.header("Authorization");

    if (!getToken)
      return res.status(400).json({ message: "Invalid Authentication." });

    const token = getToken.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "Token not provided" });
    }
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    );
    // console.log("desss", decoded);

    if (!decoded)
      return res.status(401).json({ message: "Invalid Authentication." });

    const user = await Authentication.findOne({
      _id: decoded?.user?._id,
    }).select("-password");
    if (!user) return res.status(404).json({ message: "User does not exist." });

    // console.log("user =======", user);

    req.user = user;

    next();
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
};

export const authorizeRoles = (...roles: any) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      return next(
        new AppError(
          403,
          `User type: ${req.user?.role} is not allowed to access this resouce `
        )
      );
    }
    next();
  };
};
