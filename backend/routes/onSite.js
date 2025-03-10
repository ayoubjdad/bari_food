const express = require("express");
const router = express.Router();
const {
  createOnSite,
  getOnSites,
  getOnSiteById,
  getOnSitesByDate,
} = require("../controllers/onSiteController");

// @route   POST /api/orders
// @access  Private
router.post("/", createOnSite);

// @route   GET /api/orders
// @access  Private/Admin
router.get("/", getOnSites);

// @route   GET /api/orders/:id
// @access  Private
router.get("/:id", getOnSiteById);

// @route   GET /api/orders/date/:date
// @access  Private
router.get("/date/:date", getOnSitesByDate);

module.exports = router;
