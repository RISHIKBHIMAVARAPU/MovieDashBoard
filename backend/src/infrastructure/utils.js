export const parseOmdbMovieToModel = (omdbMovies) => {
  const movieMetaData = [];

  for(const omdbMovie of omdbMovies.Search) {
    movieMetaData.push({
      imdbID : omdbMovie.imdbID,
      type: omdbMovie.Type,
      title: omdbMovie.Title,
      year: omdbMovie.Year,
      genre: omdbMovie.Genre ? omdbMovie.Genre.split(',').map(g => g.trim()) : [],
      runTime : omdbMovie.Runtime ? parseInt(omdbMovie.Runtime) : null,
      director: omdbMovie.Director,
      actors: omdbMovie.Actors ? omdbMovie.Actors.split(',').map(a => a.trim()) : [],
      rating: omdbMovie.imdbRating ? parseFloat(omdbMovie.imdbRating) : null,
      lastUsedAt: new Date()
  });
  }
  return movieMetaData;
};

export const parseOmdbMovieToMovieDetailsModel = (omdbMovie) => {
  return {
    Title: omdbMovie.Title, 
    Year: omdbMovie.Year,
    Rated: omdbMovie.Rated,
    Released: omdbMovie.Released,
    Runtime: omdbMovie.Runtime,
    Genre: omdbMovie.Genre,
    Director: omdbMovie.Director,
    Writer: omdbMovie.Writer,
    Actors: omdbMovie.Actors,
    Plot: omdbMovie.Plot,
    Language: omdbMovie.Language,
    Country: omdbMovie.Country,
    Awards: omdbMovie.Awards,
    Poster: omdbMovie.Poster,
    imdbRating: omdbMovie.imdbRating,
    imdbVotes: omdbMovie.imdbVotes,
    imdbID: omdbMovie.imdbID,
    Type: omdbMovie.Type,
    totalSeasons: omdbMovie.totalSeasons,
    Response: omdbMovie.Response,
    lastUsedAt: new Date()
  };
}
