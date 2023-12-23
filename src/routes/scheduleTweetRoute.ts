import { Router } from "express";
import { postTweet, scheduleTweet } from "../controllers/tweetsController";
import { auth } from "../authentication/auth";

const scheduleTweetRoute = Router();

scheduleTweetRoute.post("/schedule", scheduleTweet);
scheduleTweetRoute.post("/posttweet", auth, postTweet);

export { scheduleTweetRoute };
