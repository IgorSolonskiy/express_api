import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, trim: true},
  name: {type: String, required: true, trim: true},
  email: {type: String, required: true, unique: true, index: true, trim: true},
  password: {
    type: String,
    required: true,
    minLength: [6, 'password must be of minimum 6 characters length'],
  },
}, {timestamps: true});

export default mongoose.model('User', UserSchema);