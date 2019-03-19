const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  money: {
    type: Number,
    default: 1000
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  day: {
    type: Number,
    select: true
  },
  month: {
    type: String,
    select: true
  },
  year: {
    type: Number,
    select: true
  },
  gender: {
    type: String,
    required: true
  },
  products: {
    type: Array
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  messages: [
    {
      messageBody: {
        type: String,
        required: true
      },
      messageDate: {
        type: Date,
        default: Date.now
      },
      messageUser: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
