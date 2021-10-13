import mongoose from '../core/db.js';
import {users} from './users.js';
import {config} from 'dotenv';
import {posts} from './posts.js';

config();

(async () => {
  console.time('total time');
  console.time('connect DB');

  await mongoose.connection.db.dropDatabase();
  console.timeEnd('connect DB');
  console.time('seed runs');

  const users = await users();
  await posts(users);

  console.timeEnd('seed runs');
  console.timeEnd('total time');

  process.exit(0);
})();