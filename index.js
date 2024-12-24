const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "sql12753913",
    host: "sql12.freesqldatabase.com",
    password: "y3HfyqwGcb",
    database: "sql12753913"
});

// Route to fetch posts
app.get('/posts', (req, res) => {
    db.query("SELECT * FROM posts", (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

// Route to create a new post
app.post('/posts', (req, res) => {
    const content = req.body.content;
    db.query("INSERT INTO posts (content) VALUES (?)", [content], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

// Route to fetch replies for a post
app.get('/replies/:postId', (req, res) => {
    const postId = req.params.postId;
    db.query("SELECT * FROM replies WHERE post_id = ?", [postId], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

// Route to create a reply to a post
app.post('/replies', (req, res) => {
    const { postId, content } = req.body;
    db.query("INSERT INTO replies (post_id, content) VALUES (?, ?)", [postId, content], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.listen('3001', () => {
    console.log('Server is running on port 3001');
});
