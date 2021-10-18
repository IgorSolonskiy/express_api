import mongoose from '../core/db';
import {users} from './users';
import {posts} from './posts';
import env from '../env';

(async () => {
  console.time('total time');
  console.time('connect DB');

  await mongoose.connect(env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await mongoose.connection.db.dropDatabase();
  console.timeEnd('connect DB');
  console.time('seed runs');

  const usersList = await users();
  await posts(usersList);

  console.timeEnd('seed runs');
  console.timeEnd('total time');

  process.exit(0);
})();