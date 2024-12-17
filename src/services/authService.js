// src/services/authService.js
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateToken = require('../genrateToken');

const registerUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword },
  });
  return newUser;
};

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('Invalid password');
  
  const token = generateToken(user);
  return { user, token };
};

module.exports = { registerUser, loginUser };
