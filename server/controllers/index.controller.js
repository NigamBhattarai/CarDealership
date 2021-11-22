const jwt = require("jsonwebtoken");
const carsModel = require("../models/cars.model");
const messagesModel = require("../models/messages.model");
const fs = require("fs");
const { promisify } = require("util");
const bookingsModel = require("../models/bookings.model");
const userModel = require("../models/user.model");

const unlinkAsync = promisify(fs.unlink);

exports.add = async (req, res) => {
  if (req.fileValidationError) {
    console.log("Error");
    req.body.imageFiles.forEach(async (value, index, array) => {
      await unlinkAsync(value.path);
    });
    res.sendStatus(400);
  }
  else {
      var fileNames = req.body.imageFiles.map((value, index, array) => {
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
};

exports.getOneCar = async (req, res) => {
  var ObjectId = require("mongoose").Types.ObjectId;
  var isObject = ObjectId.isValid(req.query.id);
  if (isObject) {
    var carData = await carsModel.findById(req.query.id);
    if (carData) res.status(200).send(carData);
    else res.status(400).send("Invalid Data");
  } else res.status(400).send("Invalid Data");
};

exports.getFeaturedCars = async (req, res) => {
  res.status(200).send(await carsModel.find({ featured: true }));
};

exports.getPopularCars = async (req, res) => {
  res.status(200).send(await carsModel.find().sort({ orders: -1 }).limit(4));
};

exports.getNewestArrival = async (req, res) => {
  res.status(200).send(await carsModel.findOne().sort({ arrivalDate: -1 }));
};

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

exports.isLoggedIn = (req, res) => {
  res.send(req.user);
};

exports.login = async (req, res) => {
  const requestedUser = {
    username: req.body.username,
    password: req.body.password,
  };
  const loggedInUser = await userModel.findOne(requestedUser);
  if (loggedInUser) {
    requestedUser.userid = loggedInUser._id;
    const accessToken = jwt.sign(
      requestedUser,
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn:'24h'}
    );
    res.status(200).send({ accessToken });
  } else {
    res.sendStatus(400);
  }
};
