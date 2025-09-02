import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
dotenv.config();

import userRouter from './src/routes/user.js';
import movieRouter from './src/routes/movie.js';
import adminRouter from './src/routes/admin.js';

const app = express();
app.use(cors());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;


app.use(express.json());
app.use('/user', userRouter);
app.use('/movie',movieRouter);
app.use('/admin',adminRouter);

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

startServer();
