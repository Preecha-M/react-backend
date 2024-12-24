const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(express.json());

// Configure CORS
app.use(cors({
    origin: 'https://react-app-production-5771.up.railway.app', // Replace with your React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Enable this if you use cookies or authentication
}));

// Database connection
const db = mysql.createConnection({
    user: "sql12753913",
    host: "sql12.freesqldatabase.com",
    password: "y3HfyqwGcb",
    database: "sql12753913"
});

// Test database connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

// Route to fetch posts
app.get('/posts', (req, res) => {
    db.query("SELECT * FROM posts", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
});

// Route to create a new post
app.post('/posts', (req, res) => {
    const content = req.body.content;
    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    db.query("INSERT INTO posts (content) VALUES (?)", [content], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Post created successfully', id: result.insertId });
        }
    });
});

// Route to fetch replies for a post
app.get('/replies/:postId', (req, res) => {
    const postId = req.params.postId;

    db.query("SELECT * FROM replies WHERE post_id = ?", [postId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
});

// Route to create a reply to a post
app.post('/replies', (req, res) => {
    const { postId, content } = req.body;

    if (!postId || !content) {
        return res.status(400).json({ error: 'Post ID and content are required' });
    }

    db.query("INSERT INTO replies (post_id, content) VALUES (?, ?)", [postId, content], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Reply added successfully', id: result.insertId });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
