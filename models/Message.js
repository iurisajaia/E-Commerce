const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Messages Schema
const MessagesSchema = new Schema({
    name: {
        type: String,

        required: true
    },
    message: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Messages = mongoose.model("messages", MessagesSchema);
