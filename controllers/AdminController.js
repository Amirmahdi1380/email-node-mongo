// controllers/AdminController.js
const User = require('../models/User');
const EmailModel = require('../models/Email');

class AdminController {
    async getAllUsers(req, res) {
        try {
            const user = new User(); 
            await user.connect();
    
            const users = await user.collection.aggregate([
                {
                    $sort: { email: 1 }
                },
                {
                    $project: {
                        _id: 0, 
                        email: 1, 
                        firstname: 1,
                        lastname: 1, 
                    }
                }
            ]).toArray(); 
    
            res.json(users); 
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).send('Internal Server Error'); 
        }
    }
    
}

module.exports = AdminController;
