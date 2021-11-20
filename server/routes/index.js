var express = require('express');
var router = express.Router();
const multer = require('multer');
const IndexController = require("../controllers/index.controller");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const fileFilter = function (req, file, cb) {
  if (file.mimetype.split("/")[0].indexOf('image')<0) {
    req.fileValidationError = true;
    return cb(null, false, new Error('goes wrong on the mimetype'));
  }
  cb(null, true);
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

router.post('/car/add', upload.array("file", 10), function(req, res, next) {
  IndexController.add(req, res);
});

router.get('/car/all', function(req, res, next) {
  IndexController.getAllCars(req, res);
});

router.get('/car', function(req, res, next) {
  IndexController.getOneCar(req, res);
});

router.get('/car/featured', function(req, res, next) {
  IndexController.getFeaturedCars(req, res);
});

router.get('/car/popular', function(req, res, next) {
  IndexController.getPopularCars(req, res);
});

router.get('/car/new-arrival', function(req, res, next) {
  IndexController.getNewestArrival(req, res);
});

router.post('/message/add', function(req, res, next) {
  IndexController.addMessage(req, res);
});

router.post('/booking/add', function(req, res, next) {
  IndexController.addBooking(req, res);
});

module.exports = router;
