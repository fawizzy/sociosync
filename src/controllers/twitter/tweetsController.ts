import { NextFunction, Request, Response } from "express";
import { scheduler } from "../../utils/scheduler";
import { storeTweets } from "../../services/twitter/tweetServices";
import { postTweetService } from "../../services/twitter/tweetServices";
import { accessTokenFromDb } from "../../services/twitter/twitterRequestToken";

export const scheduleTweet = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    // scheduler(name);
    res.send("scheduled");
  } catch (error) {}
};

export const postTweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text } = req.body;
    const email = res["email"];
    const data = { text };

    if (!text) {
      res.send("include text in body");
      return;
    }

    // const tweet = await storeTweets({ text, email });
    const token = await accessTokenFromDb(email);
    const response = await postTweetService(token, data);
    res.send(response);
  } catch (error) {
    next(error);
  }
};
