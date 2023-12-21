import { Router } from "express";
import {
  oAuthAccessToken,
  twitterAuthURL,
} from "../authentication/twitter_authentication";

const twitterAuthRoute = Router();

twitterAuthRoute.get("/twitterauth", twitterAuthURL);
twitterAuthRoute.get("/callback", oAuthAccessToken);
export { twitterAuthRoute };
