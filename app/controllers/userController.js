const mongoose = require('mongoose');

const User = mongoose.model('User');
const Post = mongoose.model('Post');

module.exports = {
  async feed(req, res, next) {
    try {
      const user = await User.findById(req.userId);
      const { friends } = user;

      const posts = await Post
        .find({
          user: { $in: [user.id, ...friends] },
        })
        .limit(50)
        .sort('-createdAt');

      return res.json(posts);
    } catch (err) {
      return next(err);
    }
  },
};
