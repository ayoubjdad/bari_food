const asyncHandler = require("express-async-handler");
const OnSite = require("../models/OnSite");

// @desc    Create a new onSite
// @route   POST /api/onSites
// @access  Private
const createOnSite = asyncHandler(async (req, res) => {
  const { items, totalAmount } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error("No onSite items");
  }

  const onSite = new OnSite({
    items,
    totalAmount,
  });

  const createdOnSite = await onSite.save();
  res.status(201).json(createdOnSite);
});

// @desc    Fetch all onSites
// @route   GET /api/onSites
// @access  Private/Admin
const getOnSites = asyncHandler(async (req, res) => {
  const onSites = await OnSite.find({});
  res.json(onSites);
});

// @desc    Fetch single onSite by ID
// @route   GET /api/onSites/:id
// @access  Private
const getOnSiteById = asyncHandler(async (req, res) => {
  const onSite = await OnSite.findById(req.params.id);

  if (onSite) {
    res.json(onSite);
  } else {
    res.status(404);
    throw new Error("OnSite not found");
  }
});

// @desc    Fetch onSites by date
// @route   GET /api/onSites/date/:date
// @access  Private/Admin
const getOnSitesByDate = asyncHandler(async (req, res) => {
  const { date } = req.params;

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const onSites = await OnSite.find({
    createdAt: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });

  if (onSites.length > 0) {
    res.json(onSites);
  } else {
    res.status(404);
    throw new Error("No onSites found for this date");
  }
});

module.exports = {
  createOnSite,
  getOnSites,
  getOnSiteById,
  getOnSitesByDate,
};
