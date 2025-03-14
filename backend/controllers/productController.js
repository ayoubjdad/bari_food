const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Update product by ID
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    id,
    name,
    price,
    fileName,
    slug,
    shortDescription,
    longDescription,
    countInStock,
    categoryId,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.id = id || product.id;
    product.name = name || product.name;
    product.price = price || product.price;
    product.fileName = fileName || product.fileName;
    product.slug = slug || product.slug;
    product.shortDescription = shortDescription || product.shortDescription;
    product.longDescription = longDescription || product.longDescription;
    product.countInStock = countInStock || product.countInStock;
    product.categoryId = categoryId || product.categoryId;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = { getProducts, getProductById, updateProduct };
