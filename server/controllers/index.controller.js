const carsModel = require("../models/cars.model");
const messagesModel = require("../models/messages.model");
const fs = require("fs");
const { promisify } = require("util");
const bookingsModel = require("../models/bookings.model");

const unlinkAsync = promisify(fs.unlink);

exports.add = async (req, res) => {
  if (req.fileValidationError) {
    console.log("Error");
    req.files.forEach(async (value, index, array) => {
      await unlinkAsync(value.path);
    });
    res.sendStatus(400);
  } else {
    var fileNames = req.files.map((value, index, array) => {
      return "/" + value.path.split("public/")[1];
    });
    let item = new carsModel({
      name: req.body.name,
      desc: req.body.desc,
      images: fileNames,
      arrivalDate: req.body.arrivalDate,
      inStock: req.body.inStock,
      featured: req.body.featured,
      orders: req.body.orders,
    });
    item.save((err, doc, num) => {
      if (!err) {
        res.status(200).send({ doc });
      } else {
        console.error(err);
        res.status(400).send({ err });
      }
    });
  }
};

exports.getAllCars = async (req, res) => {
  res.status(200).send(await carsModel.find());
}

exports.getOneCar = async (req, res) => {
  res.status(200).send(await carsModel.findById(req.query.id));
}

exports.getFeaturedCars = async (req, res) => {
  res.status(200).send(await carsModel.find({featured:true}));
}

exports.getPopularCars = async (req, res) => {
  res.status(200).send(await carsModel.find().sort({orders:-1}).limit(4));
}

exports.getNewestArrival = async (req, res) => {
  res.status(200).send(await carsModel.findOne().sort({arrivalDate:-1}));
}

exports.addMessage = (req, res) => {
  let item = new messagesModel({
    email: req.body.email,
    message: req.body.message,
  });
  item.save((err, doc, num) => {
    if (!err) {
      res.status(200).send({ doc });
    } else {
      console.error(err);
      res.status(400).send({ err });
    }
  });
};

exports.addBooking = (req, res) => {
  let item = new bookingsModel({
    car: req.body.carid,
  });
  item.save((err, doc, num) => {
    if (!err) {
      res.status(200).send({ doc });
    } else {
      console.error(err);
      res.status(400).send({ err });
    }
  });
};
