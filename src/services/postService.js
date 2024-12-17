// src/services/postService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPost = async (title, content, authorId) => {
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId,
    },
  });
  return post;
};

const getAllPosts = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};

const getPostById = async (id) => {
  const post = await prisma.post.findUnique({ where: { id } });
  return post;
};

const updatePost = async (id, title, content, authorId) => {
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post || post.authorId !== authorId) throw new Error('Unauthorized');

  const updatedPost = await prisma.post.update({
    where: { id },
    data: { title, content },
  });
  return updatedPost;
};

const deletePost = async (id, authorId) => {
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post || post.authorId !== authorId) throw new Error('Unauthorized');

  await prisma.post.delete({ where: { id } });
  return { message: 'Post deleted' };
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };
