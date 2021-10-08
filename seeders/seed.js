import mongoose from 'mongoose';
import {usersSeed} from './users.seed.js';
import {config} from 'dotenv';
import {postsSeed} from './posts.seed.js';

config();

(async () => {
  console.time('total time');
  console.time('connect DB');
  const connect = await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await connect.connection.db.dropDatabase();
  console.timeEnd('connect DB');
  console.time('seed runs');

  const users = await usersSeed();
  await postsSeed(users);

  console.timeEnd('seed runs');
  console.timeEnd('total time');

  process.exit(0);
})();