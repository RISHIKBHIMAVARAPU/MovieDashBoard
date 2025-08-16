
import * as UserUseCases from '../useCases/userUseCases.js';
import { validateUserSignup, validateUserLogin, validateUserLogout } from './validator.js';

export const signupController = async (req, res) => {
  try {
    validateUserSignup(req.body);
    const { name, phoneNo, password } = req.body;
    const token = await UserUseCases.signup({ name, phoneNo, password });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    validateUserLogin(req.body);
    const { phoneNo, password } = req.body;
    const token = await UserUseCases.login({ phoneNo, password });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logoutController = async (req, res) => {
  try {
    validateUserLogout(req.cookies.jwt);
    const token = req.cookies.jwt;
    await UserUseCases.logout(token);
    res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
