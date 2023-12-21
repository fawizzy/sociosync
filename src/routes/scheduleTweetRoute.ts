import { Router } from "express";
import { scheduleTweet } from "../controllers/scheduletweets";

const scheduleTweetRoute = Router();

scheduleTweetRoute.post("/schedule", scheduleTweet);

export { scheduleTweetRoute };
