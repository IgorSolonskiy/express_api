import {config} from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import {errorMiddleware} from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

config();

const app = express();
const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(express.json())
    .use(cookieParser())
    .use(cors(corsConfig))
    .use('/api', usersRoutes)
    .use('/api/auth', authRoutes)
    .use(errorMiddleware);

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(process.env.API_PORT, () => console.log(
        `Server running on port: http://localhost:${process.env.API_PORT}`));

  } catch (e) {
    console.log(e);
  }
})();
