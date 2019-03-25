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
    default: 10000
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
  orders: {
    type: Array
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  phone: { type: String, default: "000 000 000" },
  city: { type: String, default: "Tbilisi" },
  adress: { type: String, default: "Chavchavadze Ave" },
  zip: { type: String, default: "0112" },

  messages: {
    inbox: [
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
    send: [
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
    ]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
