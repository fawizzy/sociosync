import { AppDataSource } from "../../data-source";
import { Tweets, Users } from "../../entity";
import { decrypt } from "../../utils/encryption";
import { oauth } from "../../utils/oauth";
import got from "got";

export const storeTweets = async ({ text, email }) => {
  try {
    const newTweet = new Tweets();
    const user = await AppDataSource.manager.findOne(Users, {
      where: { email },
    });

    if (user) {
      newTweet.text = text;
      newTweet.userId = user.id;
    }

    const tweet = await AppDataSource.manager.save(newTweet);
    return tweet;
  } catch (error) {
    throw new Error(error);
  }
};

interface tweetData {
  text: string;
}
export const postTweetService = async (
  { oauth_token, oauth_token_secret }: any,
  data: tweetData
) => {
  const decrypted_oauth_token = await decrypt(oauth_token);
  const decrypted_oauth_token_secret = await decrypt(oauth_token_secret);

  const endpointURL = `https://api.twitter.com/2/tweets`;
  const token = {
    key: decrypted_oauth_token,
    secret: decrypted_oauth_token_secret,
  };
  const authHeader = oauth.toHeader(
    oauth.authorize(
      {
        url: endpointURL,
        method: "POST",
      },
      token
    )
  );

  const options = {
    json: data,
    responseType: "json",
    headers: {
      Authorization: authHeader["Authorization"],
      "user-agent": "v2CreateTweetJS",
      "content-type": "application/json",
      accept: "application/json",
    },
  };
  const req = await got.post(endpointURL, options);
  if (req.body) {
    console.log(req.body);
    return req.body;
  } else {
    throw new Error("Unsuccessful request");
  }
};
