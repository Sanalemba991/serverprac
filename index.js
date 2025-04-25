import express from 'express';
import mongoose from 'mongoose';
import Post from './model/Post.js';

const app = express();
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Sanalemba991:Sanalemba991@yoga-master.mc6jh.mongodb.net/?retryWrites=true&w=majority&appName=yoga-master');
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};


app.post('/api/posts', async (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
    });
    
    const savedPost = await newPost.save();
    res.status(201).json({
      _id: savedPost._id,
      title: savedPost.title,
      description: savedPost.description,
      createdAt: savedPost.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    const response = posts.map(post => ({
      _id: post._id,
      title: post.title,
      description: post.description,
      createdAt: post.createdAt
    }));
    
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});