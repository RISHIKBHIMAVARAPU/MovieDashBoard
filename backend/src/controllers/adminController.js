import * as AdminUseCases from '../useCases/adminUseCases.js';
import { validateAdminLogin } from './validator.js';

export const adminLoginController = async (req, res) => {
  try {
    const { phoneNo, password } = req.body;
    validateAdminLogin(req.body);
    const token = await AdminUseCases.adminLoginUseCase({ phoneNo, password });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAllCachedMoviesController = async (req, res) => {
  try {
    const result = await AdminUseCases.deleteAllCachedMovies();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const readAllCachedMoviesController = async (req, res) => {
  try {
    const cachedMovies = await AdminUseCases.readAllCachedMovies();
    res.status(200).json(cachedMovies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const adminLogoutController = async (req, res) => {
  try {
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};
