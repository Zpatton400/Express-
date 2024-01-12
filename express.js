const express = require('express');

const app = express();
const PORT = 3000;

// middleware function
const logger = (req, res, next) => {
    console.log(`Received request to route ${req.url}`);
    next();
}

app.use(logger);

app.get('/', (req , res) => {
    console.log(req.url);

    res.send('<h1>Hello Express</h1>');
});

app.get('/products', (req, res) => {
    console.log(req.url);

    res.send('<h1>Products Page</h1>');
});

app.get('/user', (req, res) => {
    console.log(req.url);
    console.log(req.method);

    res.send('Sending the user info!');
});

app.post('/user', (req, res) => {
    console.log(req.url);
    console.log(req.method);

    res.send('Creating new user....')
});


app.get('/user/:userID', (req, res) => {
    console.log('Params Object ==>', req.params.userID);

    res.send('test')
});


app.listen(PORT, () => {
    console.log(`Server is running!`);
});


