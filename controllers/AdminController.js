// controllers/AdminController.js
const Project = require('../models/Project');

class AdminController {
    async addProject(req, res) {
        const projectData = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            minInvest: req.body.minInvest,
            expectedProfit: req.body.expectedProfit
        };

        try {
            const project = new Project();
            await project.connect();
            await project.addProject(projectData);
            res.send('پروژه با موفقیت افزوده شد!');
        } catch (error) {
            console.error('خطا در افزودن پروژه:', error);
            res.status(500).send('خطای داخلی سرور: ' + error.message); // Send the error message to the client
        }
        
    }
}

module.exports = AdminController;
