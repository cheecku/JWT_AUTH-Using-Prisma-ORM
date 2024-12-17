// src/routes/postRoutes.js
const express = require('express');
const { create, getAll, getById, update, remove } = require('../controllers/postController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticateToken, create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', authenticateToken, update);
router.delete('/:id', authenticateToken, remove);

module.exports = router;
