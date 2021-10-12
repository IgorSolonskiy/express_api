import postService from '../services/post.service.js';

const create = async (req, res, next) => {
  try {
    const {content} = req.body;
    const post = await postService.createPost(content, req.user);

    res.json(post);
  } catch (e) {
    next(e);
  }
};

const getUserPosts = async (req, res, next) => {
  try {
    const {user} = req.params;
    const posts = await postService.getPosts(user);

    res.json(posts);
  } catch (e) {
    next(e);
  }
};

const destroy = async (req, res, next) => {
  try {
    const {id} = req.params;
    await postService.deletePost(id, req.user._id);

    return res.status(204).json();
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const {content} = req.body;
    const {id} = req.params;
    const post = await postService.updatePost(id, content, req.user);

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