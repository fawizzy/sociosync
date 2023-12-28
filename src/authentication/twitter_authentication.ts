import { Request, Response } from "express";
import {
  accessToken,
  requestToken,
} from "../services/twitter/twitterRequestToken.js";
import { AppDataSource } from "../data-source.js";
import { Users } from "../entity/User.js";
import { encrypt } from "../utils/encryption.js";

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
    const email = res["email"];
    const oauth_token = req.query ? (req.query.oauth_token as string) : null;
    const oauth_verifier = req.query
      ? (req.query.oauth_verifier as string)
      : null;

    const access_token = await accessToken(oauth_token, oauth_verifier);

    const encrypted_oauth_token = await encrypt(
      access_token.get("oauth_token")
    );
    const encrypted_oauth_token_secret = await encrypt(
      access_token.get("oauth_token_secret")
    );

    const user = await AppDataSource.manager.findOne(Users, {
      where: { email },
    });
    if (user) {
      user.twitter_oauth_token = encrypted_oauth_token;
      user.twitter_oauth_token_secret = encrypted_oauth_token_secret;
      await AppDataSource.manager.save(user);
    }
    res.send(user);
  } catch (error) {
    throw new Error(error);
  }
};
