const jwt = require("jsonwebtoken");
var express = require("express");
var router = express.Router();
const multer = require("multer");
const IndexController = require("../controllers/index.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype.split("/")[0].indexOf("image") < 0) {
    req.fileValidationError = true;
    return cb(null, false, new Error("goes wrong on the mimetype"));
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

router.get("/car/all", function (req, res, next) {
  IndexController.getAllCars(req, res);
});

router.get("/car", function (req, res, next) {
  IndexController.getOneCar(req, res);
});

router.get("/car/featured", function (req, res, next) {
  IndexController.getFeaturedCars(req, res);
});

router.get("/car/popular", function (req, res, next) {
  IndexController.getPopularCars(req, res);
});

router.get("/car/new-arrival", function (req, res, next) {
  IndexController.getNewestArrival(req, res);
});

router.post("/message/add", function (req, res, next) {
  IndexController.addMessage(req, res);
});

router.post("/booking/add", function (req, res, next) {
  IndexController.addBooking(req, res);
});

router.post("/admin/login", function (req, res, next) {
  IndexController.login(req, res);
});

router.get("/admin/isLoggedIn", authenticateToken, function (req, res, next) {
  IndexController.isLoggedIn(req, res);
});

router.post("/admin/car/add", upload.array("imageFiles", 15), authenticateToken, function (req, res, next) {
  IndexController.add(req, res);
});

router.post("/admin/car/update", authenticateToken, function (req, res, next) {
  req.isUpdate=true;
  IndexController.add(req, res);
});

module.exports = router;
