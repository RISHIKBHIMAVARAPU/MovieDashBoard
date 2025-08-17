import axios from "axios";

const API_URL = "http://localhost:3001";

export const signup = async (name, phoneNo, password) => {
  return await axios.post(`${API_URL}/user/signup`, { name, phoneNo, password });
};

export const login = async (phoneNo, password) => {
  return await axios.post(`${API_URL}/user/login`, { phoneNo, password });
};

export const adminLogin = async (phoneNo, password) => {
  return await axios.post(`${API_URL}/admin/login`, { phoneNo, password });
};