import postService from '../services/post.js';
import socket from '../core/socket.js'

const create = async (req, res, next) => {
  try {
    const post = await postService.createPost(req.body.content, req.user);

    socket.to(req.user.username).emit('post', {post});
    res.json(post);
  } catch (e) {
    next(e);
  }
};

const getUserPosts = async (req, res, next) => {
  try {
    const posts = await postService.getPosts(req.params.user);

    res.json(posts);
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    await postService.deletePost(req.params.id, req.user._id);

    return res.status(204).json();
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body.content,
        req.user._id);

    return res.json(post);
  } catch (e) {
    next(e);
  }
};

const getPostsFeed = async (req, res, next) => {
  try {
    const postsFeed = await postService.getPostsFeed(req.user._id);

    return res.json(postsFeed);
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  getUserPosts,
  destroy,
  update,
  getPostsFeed,
};