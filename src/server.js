import express from 'express';
import usersRoutes from './routes/users';
import postsRoutes from './routes/posts';
import authRoutes from './routes/auth';
import stripeRoutes from './routes/stripe';
import {error} from './middleware/error';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {createServer} from 'http';
import socket from './core/socket';
import mongoose from './core/db';
import env from './env';

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
    .use((req, res, next) => res.status(404).send(`${req.url} - Not Found`))
    .use(error);

const httpServer = createServer(server);

httpServer.listen(env.API_PORT, (err) => {
  if (err) {
    console.error('Cannot run!', err);

    return process.exit(1);
  }

  mongoose.connection.once('open', () => console.log('MongoDB: Connection Succeeded.'));
  mongoose.connection.on('error', err => console.error(err));

  socket.initialize(httpServer);

  console.log(`Server running on port: http://localhost:${env.API_PORT}`);
});