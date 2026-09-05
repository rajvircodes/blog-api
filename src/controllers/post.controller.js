const Post = require("../models/post.model");
// @desc    Get all posts
// @route   GET/api/v1/posts
// @access  Public
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.status(200).json({
      success: true,
      message: "posts retrieved successfully!",
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("Get posts error", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching posts",
    });
  }
};

// @desc    Create new posts
// @route   POST/api/v1/posts
// access   Private
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body || {};

    if (typeof title !== "string" || typeof content !== "string" || !title.trim() || !content.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide title and content" });
    }

    const post = await Post.create({
      title: title.trim(),
      content: content.trim(),
      author: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully!",
      data: post,
    });
  } catch (error) {
    console.error("Post create error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error while creating post",
    });
  }
};

// @desc    Get single post by ID
// @route   GET/api/v1/posts/:id
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate("author", "name email");

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({
      success: true,
      message: "Post retrieved successfully!",
      data: post,
    });
  } catch (error) {
    console.log("Get post error:", error.message);

    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid post ID" });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while fetching post",
    });
  }
};

// @desc      Update a post
// @route     PUT/api/v1/posts/:id
// @access    Private (Owner only)
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body || {};

    if (title !== undefined && (typeof title !== "string" || !title.trim())) {
      return res.status(400).json({ success: false, message: "Title cannot be empty" });
    }

    if (content !== undefined && (typeof content !== "string" || !content.trim())) {
      return res.status(400).json({ success: false, message: "Content cannot be empty" });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "User not authorized to update this post",
      });
    }

    if (title !== undefined) post.title = title.trim();
    if (content !== undefined) post.content = content.trim();

    const updatedPost = await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.log("Update post error:", error.message);

    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid post ID" });
    }

    return res
      .status(500)
      .json({ success: false, message: "Server error while updating post" });
  }
};

// @desc    Delete a post
// @route   DELETE/api/v1/posts/:id
// @access  Private(Owner only)
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found!" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "User not authorized to delete this post",
      });
    }

    await post.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.log("Delete post error", error.message);

    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid post ID" });
    }

    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
