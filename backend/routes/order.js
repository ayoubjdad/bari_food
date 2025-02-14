const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

// @route   POST /api/orders
// @access  Private
router.post("/", createOrder);

// @route   GET /api/orders
// @access  Private/Admin
router.get("/", getOrders);

// @route   GET /api/orders/:id
// @access  Private
router.get("/:id", getOrderById);

// @route   PUT /api/orders/:id
// @access  Private/Admin
router.put("/:id", updateOrderStatus);

module.exports = router;
