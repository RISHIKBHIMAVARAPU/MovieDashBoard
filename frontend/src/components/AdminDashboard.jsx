// src/pages/AdminDashboardPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import { fetchMovies } from "../services/movieService";
import { Box, Button } from "@mui/material";

const AdminDashboardPage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    loadMovies();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove auth token
    navigate("/login", { replace: true }); // redirect to login
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Logout button at top right */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Logout
        </Button>
      </Box>

      {/* Admin Dashboard */}
      <Dashboard movies={movies} />
    </Box>
  );
};

export default AdminDashboardPage;
