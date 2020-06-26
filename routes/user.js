const express = require('express');
const router = express.Router();

const path = require('path');
const userController = require('../controllers/user.js');
const proController = require('../controllers/product.js');

router.get('/', userController.getHome);
router.get('/signup', userController.getSignup);
router.post('/signed_up', userController.postSignup);
router.get('/login', userController.getLogin);
router.post('/loggedin', userController.postLogin);
router.get('/user/:userId', userController.getMe);
router.post('/logout', userController.postLogout);
router.get('/user_edit', userController.getEditProfile);
router.post('/userProfileUpdated',userController.postEditProfile);

router.get('/addProd',proController.getAddProduct);
router.post('/addProd',proController.postAddProduct);
router.get('/allprojects',proController.getAllProjects);



// router.get('/user/:userId', userController.getMe);

module.exports = router;
