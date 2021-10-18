import mongoose from 'mongoose';
import env from '../env';

mongoose.connect(env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose;