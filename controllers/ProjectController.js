// controllers/ProjectController.js
const Project = require('../models/Project');

class ProjectController {
    async getAllProjects(req, res) {
        try {
            const project = new Project();
            await project.connect();
            const projects = await project.getAllProjects();
            res.render('home', { projects }); // Assuming you're using a templating engine like EJS or Handlebars
        } catch (error) {
            console.error('Error fetching projects:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = ProjectController;
