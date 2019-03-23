const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Cart Schema
const UserSub = new Schema({
  
  emails: { type : Array , required : true}

});

module.exports = Usersubscription = mongoose.model("subs", UserSub);