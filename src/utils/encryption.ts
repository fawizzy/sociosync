import {
  scrypt,
  randomFill,
  createCipheriv,
  randomBytes,
  createDecipheriv,
} from "crypto";
import { promisify } from "util";
import * as dotenv from "dotenv";

dotenv.config();

const scryptAsync = promisify(scrypt);

export const encrypt = async (text: string) => {
  const iv = randomBytes(16);
  const password = process.env.ENCRYPTION_KEY_PASSWORD;
  const key: string = (await scryptAsync(password, "salt", 32)) as string;
  const cipher = createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
};

export const decrypt = async (text: string) => {
  const [iv, encrypted] = text.split(":");
  const password = process.env.ENCRYPTION_KEY_PASSWORD;
  const key: string = (await scryptAsync(password, "salt", 32)) as string;
  const decipher = createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key),
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encrypted, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};
