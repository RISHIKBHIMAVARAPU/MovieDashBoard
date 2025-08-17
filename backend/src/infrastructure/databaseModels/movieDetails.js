import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  Source: { type: String },
  Value: { type: String }
}, { _id: false });

const movieSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Year: { type: String },
  Rated: { type: String },
  Released: { type: String },
  Runtime: { type: String },
  Genre: { type: String },
  Director: { type: String },
  Writer: { type: String },
  Actors: { type: String },
  Plot: { type: String },
  Language: { type: String },
  Country: { type: String },
  Awards: { type: String },
  Poster: { type: String },

  Ratings: [ratingSchema],

  Metascore: { type: String },
  imdbRating: { type: String },
  imdbVotes: { type: String },
  imdbID: { type: String, unique: true },
  Type: { type: String },

  DVD: { type: String },
  BoxOffice: { type: String },
  Production: { type: String },
  Website: { type: String },

  Response: { type: String },

  lastUsedAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24
  }
}, { timestamps: true });

const MovieDetails = mongoose.model('MovieDetails', movieSchema);

export default MovieDetails;
