import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const secretKey = process.env.SESSION_SECRET_KEY;

    const decoded = jwt.verify(token, secretKey);

    // if (!user) {
    //   res.status(401).json({ message: "unauthorized user" });
    // } else {
    //   res.locals.user = user;
    //   next();
    // }
    if (decoded["email"]) {
      res["email"] = decoded["email"];
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "unauthorized user", error });
  }
};
