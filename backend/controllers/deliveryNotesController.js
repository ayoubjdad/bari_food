const asyncHandler = require("express-async-handler");
const DeliveryNotes = require("../models/DeliveryNotes");

// @desc    Create a new deliveryNotes
// @route   POST /api/deliveryNotes
// @access  Private
const createDeliveryNotes = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("No deliveryNotes items");
  }

  const deliveryNotes = new DeliveryNotes(req.body);

  const createdDeliveryNotes = await deliveryNotes.save();
  res.status(201).json(createdDeliveryNotes);
});

// @desc    Fetch all deliveryNotes
// @route   GET /api/deliveryNotes
// @access  Private/Admin
const getDeliveryNotes = asyncHandler(async (req, res) => {
  const deliveryNotes = await DeliveryNotes.find({});

  if (!deliveryNotes.length) {
    return res.status(404).json({ message: "No delivery notes found" });
  }

  res.json(deliveryNotes);
});

// @desc    Fetch single deliveryNotes by ID
// @route   GET /api/deliveryNotes/:id
// @access  Private
const getDeliveryNotesById = asyncHandler(async (req, res) => {
  try {
    const deliveryNotes = await DeliveryNotes.findById(req.params.id);

    if (!deliveryNotes) {
      return res.status(404).json({ message: "Delivery note not found" });
    }

    res.json(deliveryNotes);
  } catch (error) {
    res.status(400).json({ message: "Invalid delivery note ID" });
  }
});

// @desc    Update deliveryNotes status
// @route   PUT /api/deliveryNotes/:id
// @access  Private/Admin
const updateDeliveryNotesStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status field is required" });
  }

  try {
    const deliveryNotes = await DeliveryNotes.findById(req.params.id);

    if (!deliveryNotes) {
      return res.status(404).json({ message: "Delivery note not found" });
    }

    deliveryNotes.status = status;
    const updatedDeliveryNotes = await deliveryNotes.save();

    res.json(updatedDeliveryNotes);
  } catch (error) {
    res.status(400).json({ message: "Invalid delivery note ID" });
  }
});

module.exports = {
  createDeliveryNotes,
  getDeliveryNotes,
  getDeliveryNotesById,
  updateDeliveryNotesStatus,
};
