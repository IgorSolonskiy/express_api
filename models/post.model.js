import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {type: String, required: true},
}, {
  timestamps: true,
  toObject: {
    transform: (doc, ret) => {
      ret.user = {
        name: ret.user_id.name,
        email: ret.user_id.email,
        username: ret.user_id.username,
      };
      delete ret.user_id;
      delete ret.__v;
    },
  },
  toJSON: {
    transform: (doc, ret) => {
      ret.user = {
        _id: ret.user_id._id,
        name: ret.user_id.name,
        email: ret.user_id.email,
        username: ret.user_id.username,
      };
      delete ret.user_id;
      delete ret.__v;
    },
  },
});

export default mongoose.model('Post', PostSchema);