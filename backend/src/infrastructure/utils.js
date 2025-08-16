export const parseOmdbMovieToModel = (omdbMovie) => {
  return {
    imdbID : omdbMovie.imdbID,
    title: omdbMovie.Title,
    year: omdbMovie.Year,
    genre: omdbMovie.Genre ? omdbMovie.Genre.split(',').map(g => g.trim()) : [],
    runTime : omdbMovie.Runtime ? parseInt(omdbMovie.Runtime) : null,
    director: omdbMovie.Director,
    actors: omdbMovie.Actors ? omdbMovie.Actors.split(',').map(a => a.trim()) : [],
    rating: omdbMovie.imdbRating ? parseFloat(omdbMovie.imdbRating) : null,
    lastUsedAt: new Date()
  };
};
