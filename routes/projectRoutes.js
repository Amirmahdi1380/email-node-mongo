// routes/projectRoutes.js
const express = require('express');
const ProjectController = require('../controllers/ProjectController');

const router = express.Router();
const projectController = new ProjectController();

router.get('/', projectController.getAllProjects);

module.exports = router;
