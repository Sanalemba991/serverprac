const express = require('express');
const mongoose = require('mongoose');
const Post = require('./model/Post');

const app = express();
app.use(express.json()); // for parsing application/json

// Connect to MongoDB
mongoose.connect('mongodb+srv://Sanalemba991:Sanalemba991@yoga-master.mc6jh.mongodb.net/?retryWrites=true&w=majority&appName=yoga-master', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

// POST Method (Add a Post)
app.post('/api/posts', async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET Method (Fetch All Posts)
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
