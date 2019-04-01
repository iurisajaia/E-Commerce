const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Custom Hoodies Schema
const CustomHoodie = new Schema({
    users: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    hoodie: {
        type: String,
        ref: "products",
        required: true
    },

    logo: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Hoodies = mongoose.model("hoodies", CustomHoodie);
