import { Router } from "express";
import {
  oAuthAccessToken,
  twitterAuthURL,
} from "../../authentication/twitter_authentication";
import { auth } from "../../authentication/auth";

const twitterAuthRoute = Router();

twitterAuthRoute.get("/twitterauth", twitterAuthURL);
twitterAuthRoute.get("/callback", auth, oAuthAccessToken);
export { twitterAuthRoute };
