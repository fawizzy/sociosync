import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Users } from "../entity/User.js";
import { encrypt } from "../utils/encryption.js";
import * as dotenv from "dotenv";
import { accessToken } from "../services/linkedin/linkedinRequestToken.js";

dotenv.config();

export const linkedinAuthURL = async (req: Request, res: Response) => {
  try {
    const encodedURL = encodeURIComponent("http://localhost:5000/callback");
    const requestTokenURL =
      "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=" +
      process.env.LINKEDIN_CLIENT_ID +
      "&redirect_uri=" +
      process.env.LINKEDIN_CALLBACK_URL +
      "&state=foobar&scope=openid%20profile%20email%20w_member_social";

    res.redirect(requestTokenURL);
  } catch (error) {
    res.send(error);
  }
};

export const linkedinAccessToken = async (req: Request, res: Response) => {
  try {
    const email = res["email"];
    console.log(email);

    const authcode = req.query ? (req.query.code as string) : null;
    if (authcode) {
      const access_token = await accessToken(authcode);
      console.log(access_token);
      const encrypted_access_token = await encrypt(
        access_token["access_token"]
      );
      const user = await AppDataSource.manager.findOne(Users, {
        where: { email },
      });

      if (user) {
        user.linkedin_access_token = encrypted_access_token;
        await AppDataSource.manager.save(user);
      }
      res.send(user);
    } else {
      throw new Error("error getting access token");
    }
  } catch (error) {
    throw new Error(error);
  }
};
