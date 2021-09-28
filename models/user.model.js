import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, trim: true},
  name: {type: String, required: true, trim: true},
  email: {type: String, required: true, unique: true, index: true, trim: true},
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  password: {
    type: String,
    required: true,
    minLength: [6, 'password must be of minimum 6 characters length'],
  },
}, {
  timestamps: true,
});

UserSchema.virtual('privateUser').get(function() {
  return {
    _id: this._id,
    username: this.username,
    name: this.name,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
});

export default mongoose.model('User', UserSchema);