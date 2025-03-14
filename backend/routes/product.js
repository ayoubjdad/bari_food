const express = require("express");
const {
  getProducts,
  getProductById,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById).put(updateProduct);

module.exports = router;
