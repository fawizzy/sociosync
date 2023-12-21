import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // You can adjust the number of salt rounds as needed

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

export const comparePassword = async (
  plain_password: string,
  hashed_password: string
) => {
  try {
    const match = await bcrypt.compare(plain_password, hashed_password);
    return match;
  } catch (error) {
    throw new Error("error comparing passwords");
  }
};
