import User from '../models/user.js';

const follow = async (username, authUser) => {
  if (username === authUser.username)
    return authUser;

  const existingFollower = await User.findOne({username});

  if (existingFollower.privateUser(authUser).following) {
    return existingFollower;
  }

  const follower = await User.findOneAndUpdate({username},
      {$push: {followers: authUser._id}}, {new: true});

  await User.findByIdAndUpdate(authUser._id,
      {$push: {followings: follower._id}}, {new: true});

  return follower;
};

const unfollow = async (username, authUser) => {
  if (username === authUser.username)
    return null;

  const existingFollower = await User.findOne({username});

  if (!existingFollower.privateUser(authUser).following) {
    return null;
  }

  const follower = await User.findOneAndUpdate({username},
      {$pull: {followers: authUser._id}}, {new: true});

  await User.findByIdAndUpdate(authUser._id,
      {$pull: {followings: follower._id}}, {new: true});
};
export default {
  follow,
  unfollow,
};