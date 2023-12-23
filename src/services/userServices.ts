import { AppDataSource } from "../data-source";
import { Users } from "../entity/User";
import { generateSessionToken } from "../utils/generateSessionToken";
import { comparePassword, hashPassword } from "../utils/passwordUtils";

export const registerUsersService = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  try {
    const hashed_password = await hashPassword(password);
    const newUser = new Users();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.hashed_password = hashed_password;
    await AppDataSource.manager.save(newUser);
    return "User successfully saved";
  } catch (error) {
    // console.log(error);
    throw new Error(error);
  }
};

export const loginService = async ({ email, password }) => {
  try {
    const user = await AppDataSource.manager.findOne(Users, {
      where: { email },
    });
    if (user) {
      const hashed_password = user.hashed_password;
      const match = await comparePassword(password, hashed_password);
      if (match) {
        const token = generateSessionToken({ email, hashed_password });
        return token;
      } else {
        throw new Error("invalid email password combination");
      }
    } else {
      throw new Error("user with email does not exist");
    }
  } catch (error) {
    throw new Error(error);
  }
};
