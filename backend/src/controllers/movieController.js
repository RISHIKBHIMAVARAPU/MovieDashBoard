import * as MovieUseCases from "../useCases/movieUseCases.js";

export const searchMovieController = async (req, res) => {
  try {
    const { name } = req.params;
    const movie = await MovieUseCases.searchMovie({ name :name});
    return res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const genreCountsController = async (req, res) => {
  try {
    const genreCounts = await MovieUseCases.getGenreCounts();
    return res.status(200).json(genreCounts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAverageRatingController = async (req, res) => {
  try {
    const averageRating = await MovieUseCases.getAverageRating();
    return res.status(200).json(averageRating);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const getAverageRuntimeByYearController = async (req, res) => {
  try {
    const averageRuntimeByYear = await MovieUseCases.getAverageRuntimeByYear();
    return res.status(200).json(averageRuntimeByYear);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const getMovieDetailsByImdbIdController = async (req, res) => {
  try {
    const { imdbId } = req.params;
    const movieDetails = await MovieUseCases.getMovieDetailsByImdbId(imdbId);
    return res.status(200).json(movieDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const getAllMovieDetailsController = async (req, res) => {
  try {
    const movieDetails = await MovieUseCases.getAllMovieDetails();
    return res.status(200).json(movieDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}