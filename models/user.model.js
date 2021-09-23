import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, trim: true},
  email: {type: String, required: true, unique: true, index: true, trim: true},
  password: {type: String, required: true, minLength: [6, 'password must be of minimum 6 characters length']},
  created_at: {type: String, default: Date.now},
  updated_at: {type: String, default: Date.now},
});

export default mongoose.model('User', UserSchema);