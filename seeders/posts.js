import User from '../models/user.js';
import Post from '../models/post.js';

export const posts = async (users) => {
  const firstPost = await Post.create(
      {content: `test posts ${users[0].name}`, user_id: users[0]._id});
  const secondPost = await Post.create(
      {content: `test posts ${users[1].name}`, user_id: users[1]._id});
  const thirdPost = await Post.create(
      {content: `test posts ${users[2].name}`, user_id: users[2]._id});
  const fourthPost = await Post.create(
      {content: `test posts ${users[3].name}`, user_id: users[3]._id});

  await User.findOneAndUpdate({_id: users[0]._id}, {$push: {posts: firstPost._id}});
  await User.findOneAndUpdate({_id: users[1]._id}, {$push: {posts: secondPost._id}});
  await User.findOneAndUpdate({_id: users[2]._id}, {$push: {posts: thirdPost._id}});
  await User.findOneAndUpdate({_id: users[3]._id}, {$push: {posts: fourthPost._id}});
};