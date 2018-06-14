const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');

const controllers = requireDir('./controllers');

// Auth
routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

routes.use(authMiddleware);

// Post
routes.post('/posts', controllers.postController.create);
routes.delete('/posts/:id', controllers.postController.destroy);

// Like
routes.post('/like/:id', controllers.likeController.toggle);

// Comment
routes.post('/comment/:id', controllers.commentController.comment);

// Friend
routes.post('/friend/:id', controllers.friendController.add);
routes.delete('/friend/:id', controllers.friendController.remove);

// Feed
routes.get('/feed', controllers.userController.feed);

module.exports = routes;
