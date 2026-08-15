const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

router.get("/", getAllPosts);
router.get("/:id", getPostById);

router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
module.exports = router;
