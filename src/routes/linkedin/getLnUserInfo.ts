import { Router } from "express";
import { auth } from "../../authentication/auth";
import { getUserLnInfoController } from "../../controllers/linkedin/getUserInfoController";

const linkedinUserRoute = Router();

linkedinUserRoute.get("/ln/user/info", getUserLnInfoController);

export { linkedinUserRoute };
