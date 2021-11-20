let mongoose = require("mongoose");
const carsModel = require("./cars.model");

let bookingSchema = new mongoose.Schema({
    car: {type:mongoose.Schema.Types.ObjectId, ref: "car"},
    createdAt: {type: Date, default:Date.now()},
});

module.exports = mongoose.model("booking", bookingSchema);
