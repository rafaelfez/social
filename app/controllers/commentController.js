const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const User = mongoose.model('User');

module.exports = {
  async comment(req, res, next) {
    try {
      const post = await Post.findById(req.params.id);
      const user = await User.findById(req.userId);
      const { friends } = user;

      if (!post) {
        return res.status(400).json({ error: 'Post doesn\'t exist' });
      }

      if (friends.indexOf(post.user) === -1) {
        return res.status(400).json({ error: 'You\'re not a friend of this user' });
      }

      const id = req.userId;

      post.comments.push({ id, ...req.body });

      await post.save();

      return res.json(post);
    } catch (err) {
      return next(err);
    }
  },
};
