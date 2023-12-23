import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

interface UserData {
  email: string;
  hashed_password: string;
  // Add any other user-related information you want to include in the token
}

export const generateSessionToken = (userData: UserData): string => {
  const secretKey = process.env.SESSION_SECRET_KEY; // Replace with a strong, secret key

  const token = jwt.sign(userData, secretKey);

  return token;
};
