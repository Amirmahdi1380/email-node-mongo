const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');
const adminRoutes = require('./routes/adminRoutes');
var cookieParser = require('cookie-parser');
const path = require('path');
const projectRoutes = require('./routes/projectRoutes');
var fs = require('fs');
const app = express();
const port = 3000;
app.use(cookieParser());
app.set('view engine', 'ejs'); // Set the view engine to EJS
app.set('public', './public'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Email', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Use userRoutes for sign-up functionality
app.use('/', adminRoutes);
app.use('/', userRoutes);
app.use('/login', userRoutes);
app.use('/signup', userRoutes);
app.use('/emails', emailRoutes);
//app.use('/projects', projectRoutes); 
app.use('/', function (req, res) {//\\firtsAJAX.html
    fs.readFile(__dirname +'/static'+req.url , function (err,data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
