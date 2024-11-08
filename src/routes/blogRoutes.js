const express = require('express');
const { createNewBlog, getAllBlogs, getSingleBlog } = require('../controllers/blogControllers');
const blogRouter = express.Router();
const requireSignin = require('../middleware/requireSignin');

blogRouter.post('/', requireSignin, createNewBlog);
blogRouter.get('/', getAllBlogs); // Add route to get all blogs
blogRouter.get('/:blogId', getSingleBlog); // Add route to get a single blog by ID




module.exports = blogRouter;
