const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categories: {
    type: Schema.Types.ObjectId,
    ref: "categories"
  },
  tags: {
    type: Array
  },
  companies: [
    {
      price: {
        type: Number
      },
      company: {
        type: Schema.Types.ObjectId,
        ref: "companies"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model("products", UserSchema);
