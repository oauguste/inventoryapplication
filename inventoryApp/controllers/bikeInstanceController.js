const BikeInstance = require("../models/bikeinstance");
const asyncHandler = require("express-async-handler");
const {
  body,
  validationResult,
} = require("express-validator");
const Bike = require("../models/bike");

// @desc Get all bikeInstance
// @route /bikeInstances
// @access Public
exports.bikeInstance_list = asyncHandler(
  async (req, res, next) => {
    const allBikeInstances = await BikeInstance.find()
      .sort({ name: 1 })
      .populate({
        path: "bike",
        populate: { path: "category" },
      })
      .exec();
    res.render("bikeinstance_list", {
      title: "Bike Instance List",
      bikeinstance_list: allBikeInstances,
    });
  }
);

// @desc Get all bikeInstance detail
// @route /bikeInstance/:itemId
// @access Public
exports.bikeInstance_detail = asyncHandler(
  async (req, res, next) => {
    const bikeInstance = await BikeInstance.findById(
      req.params.id
    )
      .populate({
        path: "bike",
        populate: { path: "category" },
      })
      .exec();

    if (bikeInstance === null) {
      const err = new Error("Bike copy not found");
      err.status = 404;
      return next(err);
    }
    res.render("bikeinstance_detail", {
      title: "Bike",
      bikeinstance: bikeInstance,
    });
  }
);

// @desc Create new bikeInstance on Get
// @route /bikeInstance/create
// @access Private
exports.bikeInstance_create_get = asyncHandler(
  async (req, res, next) => {
    const allBikes = await Bike.find({}, "title").exec();
    res.red = nd("bikeinstance_form", {
      title: "Create Bikeinstance",
      bike_list: allBikes,
    });
  }
);

// @desc Create new bikeInstance on Post
// @route /bikeInstance/create
// @access Private
exports.bikeInstance_create_post = asyncHandler(
  async (req, res, next) => {
    res.send("Not Implemented: bikeInstance get create");
  }
);

// @desc Update bikeInstance on post
// @route /bikeInstance/itemId/update
// @access Private
exports.bikeInstance_update_post = asyncHandler(
  async (req, res, next) => {
    res.send("Not Implemented: bikeInstance post Update");
  }
);

// @desc Update bikeInstance on get
// @route /bikeInstance/itemId/update
// @access Private
exports.bikeInstance_update_get = asyncHandler(
  async (req, res, next) => {
    res.send("Not Implemented: bikeInstance get Update");
  }
);

// @desc delete bikeInstance on post
// @route /bikeInstance/itemId/delete
// @access Private
exports.bikeInstance_delete_post = asyncHandler(
  async (req, res, next) => {
    res.send("Not Implemented: bikeInstance post delete");
  }
);

// @desc delete bikeInstance on get
// @route /bikeInstance/itemId/delete
// @access Private
exports.bikeInstance_delete_get = asyncHandler(
  async (req, res, next) => {
    res.send("Not Implemented: bikeInstance get delete");
  }
);
