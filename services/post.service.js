import Post from '../models/post.model.js';
import User from '../models/user.model.js';

const createPost = async (content, user) => {
  const post = await Post.create({content, user_id: user.id});

  await User.findOneAndUpdate({_id: user.id}, {$push: {posts: post._id}});

  return post;
};

const getPosts = async (username) => await User.findOne({username})
    .populate('posts');

export default {
  createPost,
  getPosts,
};