const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    fileName: { type: String, required: true },
    slug: { type: String, required: true },
    shortDescription: { type: String },
    longDescription: { type: String },
    countInStock: { type: Number, required: true },
    categoryId: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
