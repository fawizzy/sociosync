import { Router } from "express";
import { auth } from "../authentication/auth";

const authRoute = Router();

authRoute.get("/auth", auth);
export { authRoute };
