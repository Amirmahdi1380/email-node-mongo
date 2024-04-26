const User = require('../models/User');

class UserController {
    async signUp(req, res) {
        const userData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
        };
    
        try {
            const user = new User();
            await user.connect();
            console.log('Creating user:', userData); 
            await user.createUser(userData);
         
            res.redirect('/login.html');
        } catch (error) {
            console.error('Error signing up:', error);
            res.status(500).send('Internal Server Error');
        }
    }


    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = new User();
            await user.connect();
            const loggedInUser = await user.getUserByEmailAndPassword(email, password);

            if (loggedInUser) {
                res.cookie("email", email);
                res.redirect('/inbox.html');
            } else {
                res.status(401).send('Invalid email or password.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = UserController;
