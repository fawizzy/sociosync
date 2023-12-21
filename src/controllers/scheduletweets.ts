import { Request, Response } from "express";
import { scheduler } from "../utils/scheduler";

export const scheduleTweet = (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    scheduler(name);
    res.send("scheduled");
  } catch (error) {}
};
