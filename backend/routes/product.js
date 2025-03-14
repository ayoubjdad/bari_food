const express = require("express");
const {
  getProducts,
  getProductById,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

// @route   GET /api/products
// @access  Private/Admin
router.get("/", getProducts);

// @route   GET /api/products/:id
// @access  Private
router.get("/:id", getProductById);

// @route   PUT /api/products/:id
// @access  Private/Admin
router.put("/:id", updateProduct);

module.exports = router;
