import { oauth } from "./oauth";
import got from "got";
const endpointURL = `https://api.twitter.com/2/tweets`;

interface tweetData {
  text: string;
}
export const postTweetService = async (
  { oauth_token, oauth_token_secret }: any,
  data: tweetData
) => {
  const token = {
    key: oauth_token,
    secret: oauth_token_secret,
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

  const req = await got.post(endpointURL, {
    json: true,
    body: data,
    headers: {
      Authorization: authHeader["Authorization"],
      "user-agent": "v2CreateTweetJS",
      "content-type": "application/json",
      accept: "application/json",
    },
  });
  if (req.body) {
    return new URLSearchParams(req.body);
  } else {
    throw new Error("Unsuccessful request");
  }
};
