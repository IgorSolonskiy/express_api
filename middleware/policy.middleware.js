import Post from '../models/post.model.js';

export const postPolicy = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('user_id');

    if (post.userId !== req.user._id)
      return res.status(403)
          .json({message: 'You don\'t have permission to delete the post.'});

    next();
  } catch (e) {
    next(e);
  }
};