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
        _id: ret.user_id._id,
        name: ret.user_id.name,
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
        username: ret.user_id.username,
      };
      delete ret.user_id;
      delete ret.__v;
    },
  },
});

PostSchema.virtual('userId').get(function() {
  return this.user_id._id.toString()
});

export default mongoose.model('Post', PostSchema);