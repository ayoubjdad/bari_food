const mongoose = require("mongoose");

const onSiteSchema = mongoose.Schema(
  {
    items: [
      {
        product: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OnSite = mongoose.model("OnSite", onSiteSchema);

module.exports = OnSite;
