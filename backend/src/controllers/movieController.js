import * as MovieUseCases from "../useCases/movieUseCases.js";

export const searchMovieController = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await MovieUseCases.searchMovie({ imdbId :id});
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
