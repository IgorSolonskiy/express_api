import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, trim: true},
  name: {type: String, required: true, trim: true},
  email: {type: String, required: true, unique: true, index: true, trim: true},
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  avatar: {type: String, default: ''},
  password: {
    type: String,
    required: true,
    minLength: [6, 'password must be of minimum 6 characters length'],
  },
  followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  followings: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
      delete ret.__v;
      delete ret.posts;
      delete ret.email;
    },
  },
  toObject: {
    transform: (doc, ret) => {
      delete ret.password;
      delete ret.__v;
      delete ret.posts;
      delete ret.email;
    },
  },
});

UserSchema.methods.privateUser = function(authUser) {
  return {
    _id: this._id,
    username: this.username,
    name: this.name,
    avatar: this.avatar,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    following: !!this.followers.filter(user => user._id.toString() === authUser._id.toString()).length,
    followings_count: this.followings.length,
    followers_count: this.followers.length,
  };
};

export default mongoose.model('User', UserSchema);