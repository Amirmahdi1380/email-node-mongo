// routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();
const userController = new UserController();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);

module.exports = router;
