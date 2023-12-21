import { Request, Response } from "express";
import { accessToken, requestToken } from "../services/twitterRequestToken.js";

export const twitterAuthURL = async (req: Request, res: Response) => {
  try {
    const encodedURL = encodeURIComponent("http://localhost:5000/callback");
    const requestTokenURL =
      "https://api.twitter.com/oauth/request_token?oauth_callback=" +
      encodedURL +
      "&x_auth_access_type=write";

    const authUrl = await requestToken(requestTokenURL);
    res.redirect(authUrl);
  } catch (error) {
    res.send(error);
  }
};

export const oAuthAccessToken = async (req: Request, res: Response) => {
  try {
    const oauth_token = req.query ? (req.query.oauth_token as string) : null;
    const oauth_verifier = req.query
      ? (req.query.oauth_verifier as string)
      : null;
    const access_token = await accessToken(oauth_token, oauth_verifier);
    const access_token_obj = {
      oauth_token: access_token.get("oauth_token"),
      oauth_token_secret: access_token.get("oauth_token_secret"),
      user_id: access_token.get("user_id"),
      screen_name: access_token.get("screen_name"),
    };

    console.log(access_token);
    res.send(access_token_obj);
  } catch (error) {
    res.send(error);
  }
};
