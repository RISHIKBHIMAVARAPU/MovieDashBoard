import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    imdbID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    director: {
        type: String,
        required: true
    },
    actors: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    runTime : {
        type: Number,
        required: true
    },
    lastUsedAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
});

const Movie = mongoose.model('MoviesCache', movieSchema);

export default Movie;
