// What could you have done differently during the planning stages of your project to make the execution easier?
// During the planning stages, I could have created a more detailed outline of the server's architecture, including the data models and the relationships between them. This would have made it easier to structure the routes and middleware.

// Were there any requirements that were difficult to implement? What do you think would make them easier to implement in future projects?
// Implementing custom middleware for JSON body parsing was a bit challenging. Using a well-known library like body-parser would make this easier in future projects.

// What would you add to or change about your application if given more time?
// If given more time, I would add user authentication, the ability to edit and delete comments, and a more sophisticated search feature that includes filtering by multiple criteria. I would also add more robust error handling and validation for the API endpoints.
// Route to render the books view
app.get('/view/books', (req, res) => {
  res.render('books', { books });
});

// Pug template for books (create a new file named 'views/books.pug')
//doctype html
//html
//  head
//    title Digital Library
//    link(rel='stylesheet', href='/styles.css')
//  body
//    h1 Digital Library
//    ul
//      each book in books
//        li
//          img(src=book.cover alt='Book Cover')
//          h2= book.title
//          p= book.description
//    // Form to interact with the RESTful API
//    form(action='/books' method='post')
//      input(type='text' name='title' placeholder='Title')
//      textarea(name='description' placeholder='Description')
//      input(type='text' name='cover' placeholder='Cover Image URL')
//      button(type='submit') Add Book

// Data categories
let books = []; // Array to store books
let users = []; // Array to store users
let comments = []; // Array to store comments on books

// GET route for books
app.get('/books', (req, res) => {
  // Query parameters for filtering
  const { search } = req.query;
  const filteredBooks = search ? books.filter(book => book.title.includes(search)) : books;
  res.json(filteredBooks);
});

// POST route for adding a new book
app.post('/books', (req, res) => {
  const { title, description, cover } = req.body;
  const newBook = { id: books.length + 1, title, description, cover };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PATCH route for updating a book
app.patch('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, cover } = req.body;
  const book = books.find(book => book.id === parseInt(id));
  if (book) {
    book.title = title || book.title;
    book.description = description || book.description;
    book.cover = cover || book.cover;
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

// DELETE route for a book
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex(book => book.id === parseInt(id));
  if (index !== -1) {
    books.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Book not found');
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
const express = require('express');
const app = express();
const port = 3000;

// Custom middleware to log requests
function requestLogger(req, res, next) {
  console.log(`${req.method} ${req.path}`);
  next();
}

// Custom middleware to handle JSON body parsing
function bodyParser(req, res, next) {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    req.body = data ? JSON.parse(data) : {};
    next();
  });
}

// Use custom middleware
app.use(requestLogger);
app.use(bodyParser);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set up the template engine
app.set('view engine', 'pug');

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


/*Add to README file The server application created is a simple digital library where users can add books with a title, description, and cover image. It uses Node.js and Express.js to create a RESTful API that supports CRUD operations (Create, Read, Update, Delete) on the books data.
The application starts by initializing an Express server and setting up necessary middleware. Two custom middleware functions are created: one for logging requests and another for parsing JSON bodies from incoming requests. These middleware functions are then used in the application.
The application uses a template engine to render views. In this case, Pug is used. The application has a single view for displaying the list of books. The view is rendered using the `res.render` function, passing in the name of the view and the data to be displayed.
The application supports four types of HTTP requests: GET, POST, PATCH, and DELETE. The GET request is used to retrieve the list of books. The POST request is used to add a new book to the list. The PATCH request is used to update the details of an existing book. The DELETE request is used to remove a book from the list.
The application also supports query parameters for data filtering. When retrieving the list of books, a `search` query parameter can be included in the request. The application will then filter the list of books based on the search term.
In terms of data structuring, the application uses arrays to store the books, users, and comments. Each book is represented as an object with properties for the id, title, description, and cover image.
The application follows the principles of REST. Each resource (in this case, a book) has its own unique URL, and the operations on the resources are performed using standard HTTP methods.
Finally, the application includes a form within the rendered view that allows for interaction with the RESTful API. Users can enter the details of a new book and submit the form to add the book to the list.
Here is a brief overview of the endpoints and how to interact with the API:

- **GET /books**: Retrieves the list of books. Optionally, a `search` query parameter can be included to filter the list of books based on the search term.
- **POST /books**: Adds a new book to the list. The details of the book (title, description, cover image) should be included in the body of the request.
- **PATCH /books/:id**: Updates the details of an existing book. The id of the book to be updated should be included in the URL, and the new details should be included in the body of the request.
- **DELETE /books/:id**: Removes a book from the list. The id of the book to be removed should be included in the URL"/