import axios from "axios";

const API_URL = "https://moviedashboard-yrpn.onrender.com";

// Fetch movie by ID
export const getMoviesByName = async (name) => {
  const token = localStorage.getItem("token");
  return await axios.get(`${API_URL}/movie/search/${name}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getMovieDetails = async (imdbId) => {
  const token = localStorage.getItem("token");
  return await axios.get(`${API_URL}/movie/details/${imdbId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export const fetchMovies = async () => {
  const res = await axios.get(`${API_URL}/admin/allMovieDetails`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return res.data;
};
