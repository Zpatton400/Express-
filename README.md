# Express-
Showcasing a foundational knowledge of Express tools and techniques.

/*Add to README file The server application created is a simple digital library where users can add books with a title, description, and cover image. It uses Node.js and Express.js to create a RESTful API that supports CRUD operations (Create, Read, Update, Delete) on the books data.
The application starts by initializing an Express server and setting up the necessary middleware. Two custom middleware functions are created: one for logging requests and another for parsing JSON bodies from incoming requests. These middleware functions are then used in the application.
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
