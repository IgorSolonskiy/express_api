import mongoose from '../core/db';
import {users} from './users';
import {config} from 'dotenv';
import {posts} from './posts';

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