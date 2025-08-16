import * as UserRepository from "../infrastructure/repositories/userRepository.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/auth.js";

export const signup = async ({ name, phoneNo, password }) => {
  const existingUser = await UserRepository.getUserByPhoneNo(phoneNo);
  if (existingUser) {
    throw new Error('User with this phone number already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const savedUser = await UserRepository.createUser({name, phoneNo, password: hashedPassword});
  return generateToken({ id: savedUser._id });
};

export const login = async ({ phoneNo, password }) => {
  const user = await UserRepository.getUserByPhoneNo(phoneNo);
  if (!user) {
    throw new Error('User with this phone number does not exist');
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error('Invalid password');
  }
  return generateToken({ id: user._id ,name : user.name, phoneNo : user.phoneNo });
};

export const logout = async (token) => {
  try {
    return { message: 'Logout successful' };
  } catch (error) {
    return { error: 'Invalid or expired token' };
  }
};
