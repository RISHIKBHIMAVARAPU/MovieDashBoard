export const preprocessMovies = (movies) => {
  const genresCount = {};
  const ratingsByGenre = {};
  const runtimeByYear = {};

  movies.forEach(movie => {
    const year = parseInt(movie.Year);
    const runtime = parseInt(movie.Runtime) || 0;
    const rating = parseFloat(movie.imdbRating) || 0;
    const genres = movie.Genre ? movie.Genre.split(",").map(g => g.trim()) : [];

    genres.forEach(genre => {
      genresCount[genre] = (genresCount[genre] || 0) + 1;

      if (!ratingsByGenre[genre]) ratingsByGenre[genre] = { total: 0, count: 0 };
      ratingsByGenre[genre].total += rating;
      ratingsByGenre[genre].count += 1;
    });

    if (!runtimeByYear[year]) runtimeByYear[year] = { total: 0, count: 0 };
    runtimeByYear[year].total += runtime;
    runtimeByYear[year].count += 1;
  });

  const avgRatingsByGenre = Object.entries(ratingsByGenre).map(([genre, val]) => ({
    genre,
    avgRating: val.total / val.count
  }));

  const avgRuntimeByYear = Object.entries(runtimeByYear).map(([year, val]) => ({
    year: parseInt(year),
    avgRuntime: val.total / val.count
  })).sort((a,b) => a.year - b.year);

  return { genresCount, avgRatingsByGenre, avgRuntimeByYear };
};
