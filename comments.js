// Create a web server
// 1. Load the express module
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const COMMENTS_FILE = './data/comments.json';

// 2. Use the static files
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

// 3. Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// 4. Create the routes
// GET /comments
app.get('/comments', (req, res) => {
  fs.readFile(COMMENTS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

// POST /comments
app.post('/comments', (req, res) => {
  fs.readFile(COMMENTS_FILE, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const comments = JSON.parse(data);
    const newComment = {
      id: Date.now(),
