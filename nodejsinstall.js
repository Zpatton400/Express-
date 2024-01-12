// Import the express module
const express = require('express');

// Initialize the express app
const app = express();

// Define the default route ("/")
app.get('/', (req, res) => {
  // Set the status code to 200 (OK)
  res.status(200);
  
  // Set the Content-Type header to 'text/html'
  res.set('Content-Type', 'text/html');
  
  // Send the HTML content as a response
  res.send('<h1 style="color: red">Hello World!</h1><p>I wonder what else we can send...</p>');
});

// Define the "/about" route
app.get('/about', (req, res) => {
  // Set the status code to 200 (OK)
  res.status(200);
  
  // Set the Content-Type header to 'text/html'
  res.set('Content-Type', 'text/html');
  
  // Send the HTML content as a response
  res.send('<h1>About Page</h1><p>This is the about page.</p>');
});

// Start the server on port 3000
app.listen(3000, () => {
  // Log a message to the console indicating that the server is running
  console.log('Server is running on port 3000');
});