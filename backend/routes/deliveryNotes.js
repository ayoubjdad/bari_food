const express = require("express");
const router = express.Router();
const {
  createDeliveryNotes,
  getDeliveryNotes,
  getDeliveryNotesById,
  updateDeliveryNotesStatus,
} = require("../controllers/deliveryNotesController");

// @route   POST /api/deliveryNotes
// @access  Private
router.post("/", createDeliveryNotes);

// @route   GET /api/deliveryNotes
// @access  Private/Admin
router.get("/", getDeliveryNotes);

// @route   GET /api/deliveryNotes/:id
// @access  Private
router.get("/:id", getDeliveryNotesById);

// @route   PUT /api/deliveryNotes/:id
// @access  Private/Admin
router.put("/:id", updateDeliveryNotesStatus);

module.exports = router;
