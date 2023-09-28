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
    console.log(JSON.stringify(allBikeInstances, null, 2));
    res.render("bikeinstance_list", {
      title: "Bike Instance List",
      bikeinstance_list: allBikeInstances,
    });
  }
);

// @desc Get all bikeInstance detail
// @access Public
exports.bikeInstance_detail = asyncHandler(
  async (req, res, next) => {
    const allBikeInstances = await BikeInstance.findById(
      req.params.id
    )
      .populate({
        path: "bike",
        populate: { path: "category" },
      })
      .exec();

    if (allBikeInstances === null) {
      const err = new Error("Bike copy not found");
      err.status = 404;
      return next(err);
    }
    res.render("bikeinstance_detail", {
      title: "Bike",
      bikeinstance: allBikeInstances,
    });
  }
);

// @desc Create new bikeInstance on Get
// @route /bikeInstance/create
// @access Private
exports.bikeInstance_create_get = asyncHandler(
  async (req, res, next) => {
    const allBikes = await Bike.find().exec();
    res.render("bikeinstance_form", {
      title: "Create Bike instance",
      bike_list: allBikes,
    });
  }
);

// @desc Create new bikeInstance on Post
// @route /bikeInstance/create
// @access Private
exports.bikeInstance_create_post = [
  body("bike", "bike must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status", "Status must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const bikeInstance = new BikeInstance({
      bike: req.body.bike,
      status: req.body.status,
    });
    if (!errors.isEmpty()) {
      const allBikes = await Bike.find().exec();

      res.render("bikeinstance_form", {
        title: "Create Bike instance",
        bike_list: allBikes,
        selected_bike: bikeInstance.bike._id,
        errors: errors.array(),
        bikeinstance: bikeInstance,
      });
      return;
    } else {
      await bikeInstance.save();

      res.redirect(bikeInstance.url);
    }
  }),
];

// @desc Update bikeInstance on post
// @route /bikeInstance/itemId/update
// @access Private
exports.bikeInstance_update_post = asyncHandler(
  asyncHandler(async (req, res, next) => {
    res.send("Not Implemented: bikeInstance get create");
  })
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
