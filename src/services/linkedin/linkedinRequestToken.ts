import got from "got";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entity";
import * as dotenv from "dotenv";
dotenv.config();

export const accessToken = async (authcode: string) => {
  try {
    const accessTokenURL = "https://api.twitter.com/oauth/access_token";
    const body = {
      grant_type: "authorization_code",
      code: authcode,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      redirect_uri: process.env.LINKEDIN_CALLBACK_URL,
    };

    const options = {
      form: body,
      responseType: "json",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const path = `https://www.linkedin.com/oauth/v2/accessToken`;
    const req = await got.post(path, options);
    if (req.body) {
      return req.body;
    } else {
      throw new Error("Cannot get an OAuth access token");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const accessTokenFromDb = async (email: string) => {
  const user = await AppDataSource.manager.findOne(Users, {
    where: { email },
  });
  if (user) {
    const oauth_token = user.twitter_oauth_token;
    const oauth_token_secret = user.twitter_oauth_token_secret;

    return {
      oauth_token,
      oauth_token_secret,
    };
  }
};
