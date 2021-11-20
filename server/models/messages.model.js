let mongoose = require("mongoose")
let messageSchema = new mongoose.Schema({
    email: String,
    message: String,
    createdAt: {type: Date, default:Date.now()},
});

module.exports = mongoose.model("message", messageSchema);
