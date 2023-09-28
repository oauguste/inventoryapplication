const Bike = require("../models/bike");
const BikeInstance = require("../models/bikeinstance");
const Brand = require("../models/brand");
const Category = require("../models/category");
const he = require("he");

const asyncHandler = require("express-async-handler");
const {
  body,
  validationResult,
} = require("express-validator");

// @desc index page to access bikes
// @route /
// @access Public
exports.index = asyncHandler(async (req, res, next) => {
  const [
    numBikes,
    numBikeInstances,
    numAvailableBikeInstances,
    numBrands,
    numCategories,
  ] = await Promise.all([
    Bike.countDocuments({}).exec(),
    BikeInstance.countDocuments({}).exec(),
    BikeInstance.countDocuments({
      status: "In Stock",
    }).exec(),
    Brand.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Bike Inventory Application",
    bike_count: numBikes,
    bike_instance_count: numBikeInstances,
    bike_instance_available_count:
      numAvailableBikeInstances,
    brand_count: numBrands,
    category_count: numCategories,
  });
});

// @desc Get all bikes
// @route /bike/:itemId
// @access Public
exports.bike_list = asyncHandler(async (req, res, next) => {
  const bikes = await Bike.find()
    .sort({ name: 1 })
    .populate("brand")
    .exec();
  if (!bikes || bikes.length === 0) {
    return res
      .status(404)
      .json({ message: "Bikes not found" });
  }
  return res.render("bikesList", {
    title: "Bike List",
    bike_list: bikes,
  });
});
// @desc Get all bike detail
// @route /bike/:itemId
// @access Public
exports.bike_detail = asyncHandler(
  async (req, res, next) => {
    const id = req.params.id;
    const bikes = await Bike.findById(id)
      .populate("brand")
      .populate("category")
      .exec();
    if (!bikes) {
      return res
        .status(404)
        .json({ message: `Bike with ID ${id} not found` });
    }
    res.render("bike_detail.pug", {
      title: bikes.name,
      bike: bikes,
    });
  }
);

// @desc Create new bike on Get
// @route /bike/create
// @access Private
exports.bike_create_get = asyncHandler(
  async (req, res, next) => {
    const [allBrands, allCategories] = await Promise.all([
      Brand.find().exec(),
      Category.find().exec(),
    ]);
    res.render("bike_form", {
      title: "Create bike",
      brands: allBrands,
      categories: allCategories,
    });
  }
);

// @desc Create new bike on Post
// @route /bike/create
// @access Private
exports.bike_create_post = [
  (req, res, next) => {
    if (!(req.body.catalog instanceof Array)) {
      if (typeof req.body.brand === "undefined")
        req.body.brand = [];
      else req.body.brand = new Array(req.body.brand);
    }
    next();
  },
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("brand", "Brand must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "category must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("imageUrl", "Brand must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const bike = new Bike({
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
    });

    if (!errors.isEmpty()) {
      const [allBrands, allCategories] = await Promise.all([
        Brand.find().exec(),
        Category.find().exec(),
      ]);

      for (const category of allCategories) {
        if (bike.category.includes(category._id)) {
          category.checked = "true";
        }
      }

      res.render("bike_form", {
        title: "Create Bike",
        brands: allBrands,
        categories: allCategories,
        bike: bike,
        errors: errors.array(),
      });
    } else {
      await bike.save();
      res.redirect(bike.url);
    }
  }),
];

// @desc Update bike on Get
// @route /bike/itemId/update
// @access Private
exports.bike_update_get = asyncHandler(
  async (req, res, next) => {
    const [bike, allBrands, allCategories] =
      await Promise.all([
        Bike.findById(req.params.id).exec(),
        Brand.find().exec(),
        Category.find().exec(),
      ]);

    if (bike === null) {
      const err = new Error("Bike not found");
      err.status = 404;
      return next(err);
    }
    // for (const category in allCategories) {
    //   for (const bike_g of bike.category) {
    //     if (category._id.toString() === bike_g.toString()) {
    //       category.checked = "true";
    //     }
    //   }
    // }
    res.render("bike_form", {
      title: "Update Bike",
      brands: allBrands,
      category: allCategories,
      bike: bike,
    });
  }
);

// @desc Update bike on post
// @route /bike/itemId/update
// @access Private
exports.bike_update_post = [
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === "undefined") {
        req.body.category = [];
      } else {
        req.body.category = new Array(req.body.category);
      }
    }
    next();
  },

  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("brand", "Brand must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "category must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("imageUrl", "ImageUrl must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const bike = new Bike({
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      imageUrl: he.decode(he.decode(req.body.imageUrl)),
      price: req.body.price,

      //   category:
      //     typeof req.body.category === "undefined"
      //       ? []
      //       : req.body.category,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const [allBrands, allCategories] = await Promise.all([
        Brand.find().exec(),
        Category.find().exec(),
      ]);

      for (const category of allCategories) {
        if (bike.category.indexOf(category._id) > -1) {
          category.checked = "true";
        }
      }

      res.render("bike_form", {
        title: "Update Bike",
        brands: allBrands,
        category: allCategories,
        bike: bike,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedBike = await Bike.findByIdAndUpdate(
        req.params.id,
        bike,
        {}
      );
      res.redirect(updatedBike.url);
    }
  }),
];

// @desc delete bike on get
// @route /bike/itemId/delete
// @access Private
exports.bike_delete_get = asyncHandler(
  async (req, res, next) => {
    res.send("Not Implemented: Bike post Update");
  }
);

// @desc delete bike on post
// @route /bike/itemId/delete
// @access Private
exports.bike_delete_post = asyncHandler(
  async (req, res, next) => {
    res.send("Not Implemented: Bike post Update");
  }
);
