const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors
const connectDB = require("./config/db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const onSiteRoutes = require("./routes/onSite");
const deliveryNotesRoutes = require("./routes/deliveryNotes");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

dotenv.config();

connectDB();

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // Commence à ralentir après 50 requêtes
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite à 100 requêtes par IP
  message: "Trop de requêtes, veuillez réessayer plus tard.",
});

const app = express();

// Enable CORS
app.use(
  cors()
  //     {
  //   origin: "http://localhost:3000", // Allow only your React app's origin
  //   credentials: true, // Allow cookies (if needed)
  // }
);

app.use(limiter);
app.use(helmet());
app.use(speedLimiter);

// Parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/onSites", onSiteRoutes);
app.use("/api/deliveryNotes", deliveryNotesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
