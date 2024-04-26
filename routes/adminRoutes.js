// routes/adminRoutes.js
const express = require('express');
const AdminController = require('../controllers/AdminController');

const router = express.Router();
const adminController = new AdminController();

router.get('/users', adminController.getAllUsers); 

module.exports = router;
