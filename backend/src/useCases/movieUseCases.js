import * as MovieRepository from "../infrastructure/repositories/movieRepository.js";
import * as MovieDetailsRepository from "../infrastructure/repositories/movieDetailsRepository.js";
import {parseOmdbMovieToModel, parseOmdbMovieToMovieDetailsModel} from "../infrastructure/utils.js";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const searchMovie = async ({name}) => {
  try {
    const apiKey = process.env.OMDb_API;
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${name}`;
    let movies = await MovieRepository.getMoviesByTitle(name);
    if (movies.length === 0) {
      const response = await axios.get(url);
      console.log("Response from OMDb API:", response.data);
      movies = parseOmdbMovieToModel(response.data);
      MovieRepository.bulkCreateMovies(movies);
    }else{
      const movieIds = movies.map(movie => movie._id);
      await MovieRepository.updateMoviesLastUsedAt(movieIds);
    }
    return movies;
  } catch (error) {
    console.error('Error searching movie:', error);
    throw error;
  }
}

export const getGenreCounts = async () => {
  try {
    return await MovieRepository.genreCounts();
  } catch (error) {
    console.error('Error fetching genre counts:', error);
    throw error;
  }
}

export const getAverageRating = async () => {
  try {
    return await MovieRepository.getAverageRating();
  } catch (error) {
    console.error('Error fetching average rating:', error);
    throw error;
  }
}

export const getAverageRuntimeByYear = async () => {
  try {
    return await MovieRepository.getAverageRuntimeByYear();
  } catch (error) {
    console.error('Error fetching average runtime by year:', error);
    throw error;
  }
}

export const getMovieDetailsByImdbId = async (imdbId) => {
  try{
    const movieDetails = await MovieDetailsRepository.getMovieDetailsByImdbId(imdbId);
    if (!movieDetails) {
      const apiKey = process.env.OMDb_API;
      const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}`;
      const response = await axios.get(url);
      const movieData = parseOmdbMovieToMovieDetailsModel(response.data);
      return await MovieDetailsRepository.createMovieDetails(movieData);
    }
    return movieDetails;
  } catch (error) {
    console.error('Error fetching movie details by IMDb ID:', error);
    throw error; 
  } 
}

export const getAllMovieDetails = async () => {
  try {
    return await MovieDetailsRepository.getAllMovieDetails();
  } catch (error) {
    console.error('Error fetching all movie details:', error);
    throw error;
  }
}
