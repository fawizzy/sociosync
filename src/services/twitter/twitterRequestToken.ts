import got from "got";
import { oauth } from "../../utils/oauth";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entity/User";

export const requestToken = async (requestTokenURL: string) => {
  const authHeader = oauth.toHeader(
    oauth.authorize({
      url: requestTokenURL,
      method: "POST",
    })
  );
  const req = await got.post(requestTokenURL, {
    headers: {
      Authorization: authHeader["Authorization"],
    },
  });
  if (req.body) {
    const oAuthRequestToken = new URLSearchParams(req.body);
    const authorizeURL = new URL("https://api.twitter.com/oauth/authorize");
    authorizeURL.searchParams.append(
      "oauth_token",
      oAuthRequestToken.get("oauth_token")
    );
    return authorizeURL.href;
  } else {
    throw new Error("Cannot get an OAuth request token");
  }
};

export const accessToken = async (oauth_token: string, verifier: string) => {
  try {
    const accessTokenURL = "https://api.twitter.com/oauth/access_token";
    const authHeader = oauth.toHeader(
      oauth.authorize({
        url: accessTokenURL,
        method: "POST",
      })
    );
    const path = `https://api.twitter.com/oauth/access_token?oauth_verifier=${verifier}&oauth_token=${oauth_token}`;
    const req = await got.post(path, {
      headers: {
        Authorization: authHeader["Authorization"],
      },
    });
    if (req.body) {
      return new URLSearchParams(req.body);
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
