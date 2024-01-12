const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// Set up view engine
app.set('view engine', 'ejs');

// Use middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.get('/', (req, res) => {
   res.render('home');
});

app.get('/about', (req, res) => {
   res.render('about');
});

app.post('/submit', (req, res) => {
   console.log(req.body);
   res.send('Success!');
});

app.get('/users/:id', (req, res) => {
   const id = req.params.id;
   // Fetch user data from database using id
   // For now, let's just render a dummy page
   res.render('user', { id });
});

module.exports = app;