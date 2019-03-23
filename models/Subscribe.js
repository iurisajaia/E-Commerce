const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Cart Schema
const UserSub = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  Submails: []

});

module.exports = Usersubscription = mongoose.model("subs", UserSub);