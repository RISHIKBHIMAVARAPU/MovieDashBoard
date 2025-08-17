import { Grid, Card, CardContent, Typography, Container } from "@mui/material";
import GenrePieChart from "../charts/GenrePieChart";
import RatingsBarChart from "../charts/RatingsBarChart";
import RuntimeLineChart from "../charts/RuntimeLineChart";
import { preprocessMovies } from "../../utils/preprocessMovies";

const Dashboard = ({ movies }) => {
  const { genresCount, avgRatingsByGenre, avgRuntimeByYear } = preprocessMovies(movies);

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 4, textAlign: "center", color: "#333" }}
      >
        📊 Admin Dashboard
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Genre Pie Chart */}
        <Grid item xs={12} md={6} lg={4} display="flex" justifyContent="center">
          <Card sx={{ borderRadius: 3, boxShadow: 3, width: "100%", maxWidth: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
                Genres Distribution
              </Typography>
              <div style={{ height: 300 }}>
                <GenrePieChart genresCount={genresCount} />
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Ratings Bar Chart */}
        <Grid item xs={12} md={6} lg={4} display="flex" justifyContent="center">
          <Card sx={{ borderRadius: 3, boxShadow: 3, width: "100%", maxWidth: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
                Average Ratings by Genre
              </Typography>
              <div style={{ height: 300 }}>
                <RatingsBarChart avgRatingsByGenre={avgRatingsByGenre} />
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Runtime Line Chart */}
        <Grid item xs={12} md={6} lg={4} display="flex" justifyContent="center">
          <Card sx={{ borderRadius: 3, boxShadow: 3, width: "100%", maxWidth: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
                Average Runtime by Year
              </Typography>
              <div style={{ height: 300 }}>
                <RuntimeLineChart avgRuntimeByYear={avgRuntimeByYear} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
