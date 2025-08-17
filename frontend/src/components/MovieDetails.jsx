import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieService.js";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Chip,
  Divider,
  Box,
} from "@mui/material";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Card
        sx={{
          maxWidth: 900,
          width: "100%",
          p: 3,
          borderRadius: 3,
          boxShadow: 6,
          background: "linear-gradient(135deg, #fafafa, #f5f5f5)",
        }}
      >
        <Grid container spacing={3}>
          {/* Poster Section */}
          <Grid item xs={12} md={4} display="flex" justifyContent="center">
           <img
              src={movie.Poster}
              alt={movie.Title}
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "12px",
                objectFit: "cover",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                marginBottom: "1rem",
              }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x450?text=No+Poster";
              }}
            />

          </Grid>

          {/* Details Section */}
          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {movie.Title} ({movie.Year})
              </Typography>

              <Box display="flex" gap={1} mb={2}>
                <Chip label={`Rated: ${movie.Rated}`} color="primary" />
                <Chip label={movie.Genre} color="secondary" />
                <Chip label={movie.Runtime} color="success" />
              </Box>

              <Typography variant="body1" color="text.secondary" paragraph>
                {movie.Plot}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2">
                <b>Director:</b> {movie.Director}
              </Typography>
              <Typography variant="body2">
                <b>Writer:</b> {movie.Writer}
              </Typography>
              <Typography variant="body2">
                <b>Actors:</b> {movie.Actors}
              </Typography>
              <Typography variant="body2">
                <b>Released:</b> {movie.Released}
              </Typography>
              <Typography variant="body2">
                <b>Language:</b> {movie.Language}
              </Typography>
              <Typography variant="body2">
                <b>Country:</b> {movie.Country}
              </Typography>
              <Typography variant="body2">
                <b>Awards:</b> {movie.Awards}
              </Typography>

              <Box mt={2}>
                <Chip
                  label={`IMDb: ⭐ ${movie.imdbRating} (${movie.imdbVotes} votes)`}
                  sx={{ fontWeight: "bold", backgroundColor: "#ffeb3b" }}
                />
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default MovieDetails;
