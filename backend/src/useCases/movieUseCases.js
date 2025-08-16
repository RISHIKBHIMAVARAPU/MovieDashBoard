import * as MovieRepository from "../infrastructure/repositories/movieRepository.js";
import {parseOmdbMovieToModel} from "../infrastructure/utils.js";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const searchMovie = async ({imdbId}) => {
  try {
    const apiKey = process.env.OMDb_API;
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}`;
    let movie = await MovieRepository.getMovieByImdbId(imdbId);
    if (!movie) {
      const response = await axios.get(url);
      movie = parseOmdbMovieToModel(response.data);
      MovieRepository.createMovie(movie);
    }else{
      MovieRepository.updateLastUsedAt(movie._id);
    }
    return movie;
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
