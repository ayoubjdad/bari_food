const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { user, items, totalAmount, paymentMethod, shippingAddress } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const order = new Order({
    user,
    items,
    totalAmount,
    paymentMethod,
    shippingAddress,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Fetch all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email");
  res.json(orders);
});

// @desc    Fetch single order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Fetch orders by date
// @route   GET /api/orders/date/:date
// @access  Private/Admin
const getOrdersByDate = asyncHandler(async (req, res) => {
  const { date } = req.params;

  // Parse the date string to a Date object
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0); // Set to the start of the day

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day

  // Query orders created between the start and end of the specified date
  const orders = await Order.find({
    createdAt: {
      $gte: startOfDay, // Greater than or equal to the start of the day
      $lte: endOfDay, // Less than or equal to the end of the day
    },
  }).populate("user", "name email");

  if (orders.length > 0) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No orders found for this date");
  }
});

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByDate,
};
