import { AppDataSource } from "../data-source";
import { UserTest } from "../entity/User";
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
    const newUser = new UserTest();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.hashed_password = hashed_password;
    await AppDataSource.manager.save(newUser);
    return "User successfully saved";
  } catch (error) {
    console.log(error);
    throw new Error("error registering new user");
  }
};

export const loginService = async ({ email, password }) => {
  try {
    const user = await AppDataSource.manager.findOne(UserTest, {
      where: { email },
    });
    console.log(user);
    if (user) {
      const hashed_password = user.hashed_password;
      const match = await comparePassword(password, hashed_password);
      if (match) {
        const token = generateSessionToken({ email, password });
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
