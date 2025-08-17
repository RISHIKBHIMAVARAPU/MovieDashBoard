import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, role: null });

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      const decoded = jwtDecode(savedToken);
      setAuth({
        token: savedToken,
        role: decoded.role ? decoded.role : "user", // fallback to "user"
      });
    }
  }, []);

  const login = (token) => {
    const decoded = jwtDecode(token);
    setAuth({
      token,
      role: decoded.role ? decoded.role : "user",
    });
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAuth({ token: null, role: null });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
