import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    imdbID: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: String,
    },
    genre: {
        type: [String],
    },
    director: {
        type: String,
    },
    actors: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
    },
    runTime : {
        type: Number,
    },
    lastUsedAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
});

const Movie = mongoose.model('MoviesMetaData', movieSchema);

export default Movie;
