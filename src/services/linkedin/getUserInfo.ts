import got from "got";

export const userInfo = async (access_token: string) => {
  const url = "https://api.linkedin.com/v2/userinfo"; // Assuming you want to get information about the authenticated user

  const options = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const userinfo = JSON.parse((await got(url, options)).body);
  return userinfo;
};
