const Blog = require('../models/blogModels'); // Ensure the filename is correct
const User = require('../models/userModel'); // Ensure the filename is correct
const getPagination = require('../helpers/pagination');

// Create new blog controller function
const createNewBlog = async (req, res) => {
    const { title, content } = req.body;
    const { userId } = req.user;

    try {
        const newBlog = new Blog({ title, content, user: userId });
        await newBlog.save();

        if (!newBlog) {
            return res.status(400).json({ message: "Blog creation failed" });
        }

        return res.status(201).json({ message: "Blog created successfully", newBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Get all blogs controller function
const getAllBlogs = async (req, res) => {

    try {
        const {skip, limit} = getPagination(req.query);
        const blogs = await Blog.find() 
        .skip(skip)
        . limit(limit)
        .populate('user', 'firstName lastName email');

        return res.status(200).json({ message:'success', blogs});

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Get single blog controller function 
const getSingleBlog = async (req, res) => {
    const { blogId } = req.params; // Expecting the blog ID in the request params

    try {
        const blog = await Blog.findById(blogId).populate('user', 'firstName lastName email');
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        res.status(200).json({ message: "success", blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = { createNewBlog, getAllBlogs, getSingleBlog };
