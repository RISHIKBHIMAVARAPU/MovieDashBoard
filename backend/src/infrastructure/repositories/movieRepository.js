import Movie from '../databaseModels/movie.js';

export const createMovie = async (movieData) => {
  try {
    const movie = new Movie(movieData);
    return await movie.save();
  } catch (error) {
    console.error('Error while inserting a movie:', error);
    throw error;
  }
};

export const getMovieByTitle = async (title) => {
  try {
    return await Movie.findOne({ title });
  } catch (error) {
    console.error('Error fetching movie by title:', error);
    throw error;
  }
};

export const getAllMovies = async () => {
  try {
    return await Movie.find({});
  } catch (error) {
    console.error('Error fetching all movies:', error);
    throw error;
  }
};

export const deleteMovieById = async (id) => {
  try {
    return await Movie.findByIdAndDelete(id);
  } catch (error) {
    console.error('Error deleting movie by ID:', error);
    throw error;
  }
};

export const deleteAllMovies = async () => {
  try {
    return await Movie.deleteMany({});
  } catch (error) {
    console.error('Error deleting all movies:', error);
    throw error;
  }
};

export const getMovieByImdbId = async (imdbId) => {
  try {
    return await Movie.findOne({ imdbId });
  } catch (error) {
    console.error('Error fetching movie by IMDb ID:', error);
    throw error;
  }
};

export const updateLastUsedAt = async (id) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
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

export const genreCounts = async () => {
  try {
    return await Movie.aggregate([
      { $unwind: "$genre" },
      { $group: { _id: "$genre", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
  } catch (error) {
    console.error('Error fetching genre counts:', error);
    throw error;
  }
}

export const getAverageRating = async () => {
  try {
    return await Movie.aggregate([
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
      { $project: { _id: 0, avgRating: 1 } }
    ]);
  } catch (error) {
    console.error('Error fetching average rating:', error);
    throw error;
  }
}

export const getAverageRuntimeByYear = async () => {
  try {
    return await Movie.aggregate([
      { $group: { _id: "$year", avgRuntime: { $avg: "$runtime" } } },
      { $project: { _id: 0, year: "$_id", avgRuntime: 1 } },
      { $sort: { year: 1 } }
    ]);
  } catch (error) {
    console.error('Error fetching average runtime by year:', error);
    throw error;
  }
}

export const deleteAllCachedMovies = async () => {
  try {
    return await Movie.deleteMany({});
  } catch (error) {
    console.error('Error deleting all cached movies:', error);
    throw error;
  }
}

export const readAllCachedMovies = async () => {  
  try {
    return await Movie.find({});
  } catch (error) {
    console.error('Error reading all cached movies:', error);
    throw error;
  }
}
