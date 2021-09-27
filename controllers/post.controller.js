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

const index = async (req, res, next) => {
  try {
    const {user} = req.params;
    const post = await postService.getPosts(user);

    res.json(post);
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  index,
};