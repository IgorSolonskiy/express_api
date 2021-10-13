import {config} from 'dotenv';
import express from 'express';
import usersRoutes from './routes/users.js';
import postsRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import stripeRoutes from './routes/stripe.js';
import {error} from './middleware/error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {createServer} from 'http';
import socket from './core/socket.js';
import mongoose from './core/db.js'

config();

const server = express();
const corsConfig = {
  origin: true,
  credentials: true,
};

server.use(express.json())
    .use(cookieParser())
    .use(cors(corsConfig))
    .use(express.urlencoded({extended: true}))
    .use('/api', usersRoutes)
    .use('/api', postsRoutes)
    .use('/api', stripeRoutes)
    .use('/api/auth', authRoutes)
    .use(error);

const httpServer = createServer(server);

httpServer.listen(process.env.API_PORT, (err) => {
  if (err) {
    console.error('Cannot run!', err);

    return process.exit(1);
  }

  mongoose.connection.once('open', () => console.log('MongoDB: Connection Succeeded.'));
  mongoose.connection.on('error', err => console.error(err));

  socket.initialize(httpServer);

  console.log(`Server running on port: http://localhost:${process.env.API_PORT}`);
});