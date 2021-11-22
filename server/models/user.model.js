let mongoose = require("mongoose")
let userSchema = new mongoose.Schema({
  username: String,
  password: String,
  userType: String,
  createdAt: {type: Date, default:Date.now()},
  updatedAt: {type: Date, default:Date.now()},
});

module.exports = mongoose.model("user", userSchema);
