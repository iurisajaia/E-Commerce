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
  companies: [
    {
      name: {
        type: String
      },
      price: {
        type: Number
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model("products", UserSchema);
