var express = require('express');
var router = express.Router();
var registerController = require('../controllers/registerController');
var userController = require('../controllers/userController');
var postController = require('../controllers/postController');
var commentController = require('../controllers/commentController');
var likeController = require('../controllers/likeController');
var friendController = require('../controllers/friendController');
var notifController = require('../controllers/notifController');
var feedController = require('../controllers/feedController');





//***
//* Routing Register
//**
router.post('/login', registerController.login);
router.post('/register', registerController.register);

//***
//* Routing User
//**
router.post('/search', userController.search);
router.post('/user/search', userController.userSearch); //autocomplete
router.post('/user/', userController.create);
router.delete('/user/:id', userController.delete);
router.put('/user/:id', userController.edit);
router.get('/user/:id', userController.show);

//***
//* Routing Post
//**
router.post('/post', postController.create);
router.get('/user/:id/post', postController.display);

//***
//* Routing Comment
//**
router.post('/post/:id/comment', commentController.create);
router.get('/post/:id/comment', commentController.populate);

//***
//* Routing Like
//**
router.post('/post/:id/like', likeController.createP);             // Like a post
router.delete('/post/:id/like/:u_id', likeController.unlikeP);     // Unlike a post
router.get('/post/:id/like', likeController.getP);                 // Get number of likes on post
router.get('/post/:id/like/:u_id', likeController.checkP);    // Check if already liked
router.post('/comment/:id/like', likeController.createC);          // Like a comment
router.delete('/comment/:id/like/:u_id', likeController.unlikeC);  // Unlike a comment
router.get('/comment/:id/like', likeController.getC);              // Get number of likes on comment
router.get('/comment/:id/like/:u_id', likeController.checkC); // Check if already liked

//***
//* Routing Notif
//**
router.post('/notif/', notifController.getAllNotif);
router.get('/notif/:id', notifController.read);

//***
//* Routing Feed
//**
router.get('/feed/:id', feedController.getPost);


//***
//* Routing Friend
//**
router.get('/friend/list/:id', friendController.getFriends);
router.get('/friend/request/:id', friendController.getRequests);
router.get('/user/:u_id/friend/request/:id', friendController.request);   // u_id wants to be friends with id
router.get('/user/:u_id/friend/accept/:id', friendController.accept);   // u_id accepts to be friends with id
router.get('/user/:u_id/friend/reject/:id', friendController.reject);   // u_id refuse to be friends with id
router.get('/user/:u_id/friend/delete/:id', friendController.delete);   // u_id no longer wants to be friends with id
router.get('/user/:u_id/friend/check/:id', friendController.check);   // check if u_id is friends with id


module.exports = router;
