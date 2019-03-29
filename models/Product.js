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
  imageUrl: {
    type: String
  },
  tags: {
    type: Array
  },
  sold: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      userName: {
        type: String
      },
      review: {
        type: String
      }
    }
  ],
  total: {
    type: Number,
    default: 1
  },
  company: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model("products", UserSchema);
