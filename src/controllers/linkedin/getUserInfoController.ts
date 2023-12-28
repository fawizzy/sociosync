import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Users } from "../../entity";
import { decrypt } from "../../utils/encryption";
import { userInfo } from "../../services/linkedin/getUserInfo";

export const getUserLnInfoController = async (req: Request, res: Response) => {
  try {
    const email = "oduolafawaz@gmail.com"; //res["email"];
    console.log(email);

    if (email) {
      const user = await AppDataSource.manager.findOne(Users, {
        where: { email },
      });

      const linkedin_access_token = await decrypt(user.linkedin_access_token);
      const linkedinInfo = await userInfo(linkedin_access_token);
      res.send(linkedinInfo);
    } else {
      throw new Error("error getting access token");
    }
  } catch (error) {
    throw new Error(error);
  }
};
