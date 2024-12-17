// src/controllers/authController.js
const { registerUser, loginUser } = require('../services/authService');

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await registerUser(email, password);
    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login };
