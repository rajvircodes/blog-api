const Category = require("../models/category.model");

const handleCategoryError = (error, res, action) => {
  console.error(`Category ${action} error:`, error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid category ID" });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A category with this name already exists",
    });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ success: false, message: error.message });
  }

  return res.status(500).json({
    success: false,
    message: `Server error while ${action} category`,
  });
};

// @desc    Create a category
// @route   POST /api/v1/categories
const createCategory = async (req, res) => {
  try {
    const { name } = req.body || {};

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const category = await Category.create({ name: name.trim() });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    return handleCategoryError(error, res, "creating");
  }
};

// @desc    Get all categories
// @route   GET /api/v1/categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    return res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    return handleCategoryError(error, res, "fetching");
  }
};

// @desc    Get a category by ID
// @route   GET /api/v1/categories/:id
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: category,
    });
  } catch (error) {
    return handleCategoryError(error, res, "fetching");
  }
};

// @desc    Update a category
// @route   PUT /api/v1/categories/:id
const updateCategory = async (req, res) => {
  try {
    const { name } = req.body || {};

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    category.name = name.trim();
    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    return handleCategoryError(error, res, "updating");
  }
};

// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return handleCategoryError(error, res, "deleting");
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
