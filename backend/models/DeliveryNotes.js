const mongoose = require("mongoose");

const deliveryNotesSchema = mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const DeliveryNotes = mongoose.model("DeliveryNotes", deliveryNotesSchema);

module.exports = DeliveryNotes;
