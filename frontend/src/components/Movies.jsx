import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getMoviesByName, getMovieDetails } from "../services/movieService.js";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  AppBar,
  Toolbar,
} from "@mui/material";

const Movies = () => {
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!movieName) return;
    try {
      const { data } = await getMoviesByName(movieName);
      setMovies(Array.isArray(data) ? data : []);
      setSelectedMovie(null);
    } catch (err) {
      console.error("Error fetching movies:", err);
      alert("Movies not found!");
      setMovies([]);
    }
  };

  const handleCardClick = async (id) => {
    setLoading(true);
    try {
      const { data } = await getMovieDetails(id);
      setSelectedMovie(data);
    } catch (err) {
      console.error("Error fetching movie details:", err);
      alert("Failed to fetch details");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  // Sort movies by year or year range start
  const sortedMovies = useMemo(() => {
    if (!sortOrder) return movies;
    const copy = [...movies];
    copy.sort((a, b) => {
      const parseYear = (yearStr) => {
        if (!yearStr) return 0;
        // Split on en-dash '–' and parse the start year
        const yearPart = yearStr.split("–")[0];
        const numYear = Number(yearPart);
        return isNaN(numYear) ? 0 : numYear;
      };
      const ay = parseYear(a.year);
      const by = parseYear(b.year);
      return sortOrder === "asc" ? ay - by : by - ay;
    });
    return copy;
  }, [movies, sortOrder]);

  return (
    <>
      {/* Top Bar */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            🎬 Movie Dashboard
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{ textTransform: "none" }}
          >
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          Search Movies
        </Typography>

        {/* Search Bar */}
        <Box display="flex" justifyContent="center" gap={2} mb={3}>
          <TextField
            label="Enter Movie Name..."
            variant="outlined"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ minWidth: 120 }}
          >
            Search
          </Button>
        </Box>

        {/* Sort Control */}
        {!selectedMovie && sortedMovies.length > 0 && (
          <Box display="flex" justifyContent="center" mb={3}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Sort by Year</InputLabel>
              <Select
                value={sortOrder}
                label="Sort by Year"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="asc">Ascending (Old → New)</MenuItem>
                <MenuItem value="desc">Descending (New → Old)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}

        {/* Loading Spinner */}
        {loading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}

        {/* Movies Display Grid using CSS Grid */}
        {!selectedMovie && !loading && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {sortedMovies.map((movie, index) => (
              <Card
                key={movie.imdbID}
                sx={{
                  width: 260,
                  height: 220,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                  overflow: "hidden",
                }}
                onClick={() => handleCardClick(movie.imdbID)}
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                    px: 2,
                    py: 1.5,
                  }}
                >
                  {/* Index display for debugging */}
                  <Typography
                    variant="caption"
                    sx={{ mb: 1, color: "text.secondary", fontWeight: "bold" }}
                  >
                    #{index + 1}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      width: "100%",
                    }}
                  >
                    {movie.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      wordWrap: "break-word",
                      textAlign: "center",
                      maxWidth: "100%",
                    }}
                  >
                    <b>ID:</b> {movie.imdbID}
                  </Typography>
                  <Typography variant="body2">
                    <b>Year:</b> {movie.year ?? "—"}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {/* Selected Movie Details */}
        {selectedMovie && (
          <Card sx={{ mt: 4, p: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {selectedMovie.Title}
            </Typography>
            <Box mb={2}>
              <Typography>
                <b>Year:</b> {selectedMovie.Year}
              </Typography>
              <Typography>
                <b>Rated:</b> {selectedMovie.Rated}
              </Typography>
              <Typography>
                <b>Released:</b> {selectedMovie.Released}
              </Typography>
              <Typography>
                <b>Runtime:</b> {selectedMovie.Runtime}
              </Typography>
              <Typography>
                <b>Genre:</b> {selectedMovie.Genre}
              </Typography>
              <Typography>
                <b>Director:</b> {selectedMovie.Director}
              </Typography>
              <Typography>
                <b>Writer:</b> {selectedMovie.Writer}
              </Typography>
              <Typography>
                <b>Actors:</b> {selectedMovie.Actors}
              </Typography>
              <Typography>
                <b>Plot:</b> {selectedMovie.Plot}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSelectedMovie(null)}
            >
              Back to Results
            </Button>
          </Card>
        )}
      </Container>
    </>
  );
};

export default Movies;
