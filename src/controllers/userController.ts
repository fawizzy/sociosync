import { NextFunction, Request, Response } from "express";
import { loginService, registerUsersService } from "../services/userServices";

export const registerUsers = (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;

    const registerUser = registerUsersService({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(200).json("user successfully registerd");
  } catch (error) {}
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const token = await loginService({
      email,
      password,
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
