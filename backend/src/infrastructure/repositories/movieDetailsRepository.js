import MovieDetails from "../databaseModels/movieDetails.js";

export const createMovieDetails = async (movieData) => {
  try {
    const movieDetails = new MovieDetails(movieData);
    return await movieDetails.save();
  } catch (error) {
    console.error('Error while inserting movie details:', error);
    throw error;
  }
};

export const getMovieDetailsByImdbId = async (imdbId) => {
  try {
    return await MovieDetails.findOne({ imdbID: imdbId });
  } catch (error) {
    console.error('Error fetching movie details by IMDb ID:', error);
    throw error;
  }
};

export const updateLastUsedAt = async (id) => {
  try {
    const updatedMovie = await MovieDetails.findByIdAndUpdate(
      id,
      { createdAt: new Date() },
      { new: true }
    );
    return updatedMovie;
  } catch (error) {
    console.error('Error updating last used time:', error);
    throw error;
  }
};  

export const getAllMovieDetails = async () => {
  try {
    return await MovieDetails.find({});
  } catch (error) {
    console.error('Error fetching all movie details:', error);
    throw error;
  }
};