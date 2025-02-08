const express = require("express");
const {
  authUser,
  registerUser,
  getMe,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", authUser);
router.post("/register", registerUser);

// @route   GET /api/auth/me
// @desc    Get logged-in user data
// @access  Private
router.get("/me", protect, getMe);

module.exports = router;
