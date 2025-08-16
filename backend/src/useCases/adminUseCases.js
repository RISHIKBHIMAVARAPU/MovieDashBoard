import * as AdminRepository from '../infrastructure/repositories/adminRepository.js';
import  * as MovieRepository from '../infrastructure/repositories/movieRepository.js';
import { generateToken } from "../middlewares/auth.js";
import bcrypt from "bcryptjs";

export const adminLoginUseCase = async ({phoneNo, password}) => {
  try {
    const admin = await AdminRepository.getAdminByPhoneNo(phoneNo);
    if (!admin) {
      throw new Error('Admin not found');
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      throw new Error('Invalid password');
    }
    const token = generateToken({...admin, role: 'admin'});
    return token;
  } catch (error) {
    console.error('Error in adminLoginUseCase:', error);
    throw error;
  }
};

export const deleteAllCachedMovies = async () => {
  try {
    return await MovieRepository.deleteAllCachedMovies();
  } catch (error) {
    console.error('Error deleting all cached movies:', error);
    throw error;
  }
}

export const readAllCachedMovies = async () => {
  try {
    return await MovieRepository.readAllCachedMovies();
  } catch (error) {
    console.error('Error reading all cached movies:', error);
    throw error;
  }
}
