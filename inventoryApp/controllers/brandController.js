const Brand = require("../models/brand");
const Bike = require("../models/bike");
const {
  body,
  validationResult,
} = require("express-validator");
const asyncHandler = require("express-async-handler");

// @desc Get all brands
// @route /brands
// @access Public
exports.brand_list = asyncHandler(
  async (req, res, next) => {
    const allbrands = await Brand.find()
      .sort({ name: 1 })
      .exec();

    res.render("brand_list", {
      title: "Brands",
      brands: allbrands,
    });
  }
);

// @desc Get all brand detail
// @route /brand/:itemId
// @access Public
exports.brand_detail = asyncHandler(
  async (req, res, next) => {
    const brand = await Brand.findById(req.params.id)
      .sort({
        name: 1,
      })
      .exec();

    const brandBikes = await Bike.find({
      brand: brand._id,
    }).exec();
    res.render("brand_detail.pug", {
      title: brand,
      bikes: brandBikes,
      brand: brand,
    });
  }
);

// @desc Create new brand on Get
// @route /brand/create
// @access Private
exports.brand_create_get = asyncHandler(
  async (req, res, next) => {
    res.render("brand_form", {
      title: "Create brand",
    });
  }
);

// @desc Create new brand on Post
// @route /brand/create
// @access Private
exports.brand_create_post = [
  body("name").trim().isLength({ min: 3 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const brand = new Brand({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      res.render("brand_form", {
        title: "Create brand",
        brand: brand,
        errors: errors.array(),
      });
    } else {
      await brand.save();
      res.redirect(brand.url);
    }
  }),
];

// @desc Update brand on post
// @route /brand/itemId/update
// @access Private
exports.brand_update_post = asyncHandler();
//   body("name").trim().isLength({ min: 3 }).escape(),

//   asyncHandler(async (req, res, next) => {
//     const errors = validationResult(req);

//     const brand = new Brand({
//       name: req.body.name,
//     });
//     if (!errors.isEmpty()) {
//       res.render("brand_form", {
//         title: "Create brand",
//         brand: brand,
//         errors: errors.array(),
//       });
//       return;
//     } else {
//       await brand.save();

//       res.redirect(brand.url);
//     }
//   })

// @desc Update brand on get
// @route /brand/itemId/update
// @access Private
exports.brand_update_get = asyncHandler();
//   async (req, res, next) => {
//     const [brand, allBikesInBrand] = await Promise.all([
//       Brand.findById(req.params.id).exec(),
//       Bike.find({ brand: req.params.id }, "title").exec(),
//     ]);

//     if (brand === null) {
//       redirect("/catalog/brands");
//     }
//     res.render({
//       title: "Delete Brand",
//       brand: brand,
//       brand_bikes: allBikesInBrand,
//     });
//   }

// @desc delete brand on post
// @route /brand/itemId/delete
// @access Private
exports.brand_delete_post = asyncHandler(
  async (req, res, next) => {
    const [brand, allBikesInBrand] = await Promise.all([
      Brand.findById(req.params.id).exec(),
      Bike.find({ brand: req.params.id }, "title").exec(),
    ]);

    if (allBikesInBrand.length > 0) {
      res.render("brand_delete", {
        title: "Delete Brand",
        brand: brand,
        brand_bikes: allBikesInBrand,
      });
      return;
    } else {
      await Brand.findByIdAndRemove(req.body.brandid);
      res.redirect("/catalog/brands");
    }
  }
);

// @desc delete brand on get
// @route /brand/itemId/delete
// @access Private
exports.brand_delete_get = asyncHandler(
  async (req, res, next) => {
    console.log("ID from params:", req.params.id);
    const [brand, allBikesByBrand] = await Promise.all([
      Brand.findById(req.params.id).exec(),
      Bike.find({ brand: req.params.id }).exec(),
    ]);
    if (brand === null) {
      res.redirect("/catalog/brands");
    }
    res.render("brand_delete", {
      title: "Delete Brand",
      brand: brand,
      brand_bikes: allBikesByBrand,
    });
  }
);
