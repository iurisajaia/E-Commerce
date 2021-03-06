const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Orders Schema
const OrdersSchema = new Schema({
  user: {
    type: Object,

    required: true
  },
  products: {
    type: Array
  },
  status: { type: String, default: "Loading" },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Orders = mongoose.model("orders", OrdersSchema);
