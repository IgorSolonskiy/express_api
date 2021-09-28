import Post from '../models/post.model.js';
import User from '../models/user.model.js';

const createPost = async (content, user) => {
  const post = await Post.create({content, user_id: user._id});

  await User.findOneAndUpdate({_id: user._id}, {$push: {posts: post._id}});

  return post.populate('user_id');
};

const getPosts = async (username) => {
  const user = await User.findOne({username}).populate({path:'posts', populate:{path:'user_id'}});

  return user.posts;
};

export default {
  createPost,
  getPosts,
};