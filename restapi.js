// Data structure for storing comments
const comments = [];

module.exports = comments;

const comments = require("./data/comments");
const commentsRouter = require("./routes/comments");

// ... existing code ...

// Use the comments router
app.use("/api/comments", commentsRouter);

// ... existing code ...

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port: .`);
});

const express = require("express");
const router = express.Router();
const comments = require("../data/comments");
const error = require("../utilities/error");

// Route to retrieve all comments
router.get("/", (req, res) => {
  res.json(comments);
});

// Route to create a new comment
router.post("/", (req, res, next) => {
  const { userId, postId, body } = req.body;
  if (userId && postId && body) {
    const newComment = {
      id: comments.length + 1,
      userId,
      postId,
      body,
    };
    comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    next(error(400, "Missing required comment fields"));
  }
});

// Route to retrieve a comment by id
router.get("/:id", (req, res, next) => {
  const comment = comments.find((c) => c.id == req.params.id);
  if (comment) {
    res.json(comment);
  } else {
    next(error(404, "Comment not found"));
  }
});

// Route to update a comment by id
router.patch("/:id", (req, res, next) => {
  const comment = comments.find((c, i) => {
    if (c.id == req.params.id) {
      comments[i].body = req.body.body || comments[i].body;
      return true;
    }
  });
  if (comment) {
    res.json(comment);
  } else {
    next(error(404, "Comment not found"));
  }
});

// Route to delete a comment by id
router.delete("/:id", (req, res, next) => {
  const commentIndex = comments.findIndex((c) => c.id == req.params.id);
  if (commentIndex > -1) {
    comments.splice(commentIndex, 1);
    res.status(204).end();
  } else {
    next(error(404, "Comment not found"));
  }
});

// Export the router
module.exports = router;

// Route to retrieve comments by userId
router.get("/", (req, res) => {
  const { userId, postId } = req.query;
  let filteredComments = comments;
  if (userId) {
    filteredComments = filteredComments.filter((c) => c.userId == userId);
  }
  if (postId) {
    filteredComments = filteredComments.filter((c) => c.postId == postId);
  }
  res.json(filteredComments);
});

// Route to retrieve comments for a specific post
router.get("/posts/:postId", (req, res) => {
  const postComments = comments.filter((c) => c.postId == req.params.postId);
  res.json(postComments);
});

// Route to retrieve comments made by a specific user
router.get("/users/:userId", (req, res) => {
  const userComments = comments.filter((c) => c.userId == req.params.userId);
  res.json(userComments);
});

// Route to retrieve comments made by a specific user on a specific post
router.get("/users/:userId/posts/:postId", (req, res) => {
  const userPostComments = comments.filter(
    (c) => c.userId == req.params.userId && c.postId == req.params.postId
  );
  res.json(userPostComments);
});

