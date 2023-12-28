import { Router } from "express";
import { auth } from "../../authentication/auth";
import {
  linkedinAccessToken,
  linkedinAuthURL,
} from "../../authentication/linkedin_auth";

const linkedinAuthRoute = Router();

linkedinAuthRoute.get("/linkedinauth", linkedinAuthURL);
linkedinAuthRoute.get("/auth/ln/callback", linkedinAccessToken);
export { linkedinAuthRoute };
