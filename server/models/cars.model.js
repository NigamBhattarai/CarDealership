let mongoose = require("mongoose")
let carSchema = new mongoose.Schema({
  name: String,
  desc: String,
  images: Array,
  arrivalDate: Date,
  inStock: Number,
  featured: Boolean,
  orders: Number,
  createdAt: {type: Date, default:Date.now()},
  updatedAt: {type: Date, default:Date.now()},
});

module.exports = mongoose.model("car", carSchema);
