const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors
const connectDB = require("./config/db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");

dotenv.config();

connectDB();

const app = express();

// Enable CORS
app.use(
  cors()
  //     {
  //   origin: "http://localhost:3000", // Allow only your React app's origin
  //   credentials: true, // Allow cookies (if needed)
  // }
);

// Parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
