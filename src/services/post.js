import Post from '../models/post';
import User from '../models/user';

const createPost = async (content, user) => {
  const post = await Post.create({content, user_id: user._id});

  await User.findOneAndUpdate({_id: user._id}, {$push: {posts: post._id}});

  return post.populate('user_id');
};

const deletePost = async (_id) => await Post.findOneAndRemove({_id});

const updatePost = async (_id, content) => await Post.findOneAndUpdate({_id},
    {content}, {new: true}).populate('user_id');

const getPosts = async (username) => {
  const user = await User.findOne({username}).populate({
    path: 'posts', options: {
      sort: {'createdAt': 'desc'},
    }, populate: {path: 'user_id'},
  });

  return user.posts;
};

const getPostsFeed = async (userId) => {
  const authUser = await User.findById(userId);

  return Post.find({
    'user_id': [...authUser.followings, authUser._id],
  }, null, {sort: {'createdAt': 'desc'}}).populate('user_id');
};

export default {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  getPostsFeed,
};