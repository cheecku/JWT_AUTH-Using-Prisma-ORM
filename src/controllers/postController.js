// src/controllers/postController.js
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../services/postService');

const create = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.user;
  try {
    const post = await createPost(title, content, userId);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await getPostById(Number(id));
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { userId } = req.user;
  try {
    const post = await updatePost(Number(id), title, content, userId);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    await deletePost(Number(id), userId);
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { create, getAll, getById, update, remove };
