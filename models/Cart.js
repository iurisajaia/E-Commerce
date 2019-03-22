const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Cart Schema
const CartSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "products",
    required: true
  },

  quantity: {
    type: Number,
    default: 1
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Cart = mongoose.model("cart", CartSchema);
