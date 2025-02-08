const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

module.exports = { getCategories };
