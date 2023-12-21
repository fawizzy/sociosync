import { Router } from "express";
import { login, registerUsers } from "../controllers/userController";

const userRoute = Router();

userRoute.post("/register", registerUsers);
userRoute.get("/login", login);
export { userRoute };
