const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const Book = require("../models/category");
const bike = require("../models/bike");
const {
  body,
  validationResult,
} = require("express-validator");

// @desc Get all categorys
// @route /categorys
// @access Public
exports.category_list = asyncHandler(
  async (req, res, next) => {
    const categories = await Category.find()
      .sort({ name: 1 })
      .exec();

    res.render("category_list", {
      title: "Categories",
      categories: categories,
    });
  }
);

// @desc Get all category detail
// @route /category/:itemId
// @access Public
exports.category_detail = asyncHandler(
  async (req, res, next) => {
    const category = await Category.findById(req.params.id)
      .sort({ name: 1 })
      .exec();

    const bikes = await bike
      .find({
        category: category._id,
      })
      .exec();

    res.render("category_detail", {
      title: category,
      bikes: bikes,
    });
  }
);

// @desc Create new category on Get
// @route /category/create
// @access Private
//display category create form on get
exports.category_create_get = async (req, res, next) => {
  res.render("category_form", {
    title: "Create category",
  });
};

// @desc Create new category on Post
// @route /category/create
// @access Private
exports.category_create_post = [
  body(
    "name",
    "Category name must contain at least 3 characters"
  )
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({ name: req.body.name });
    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExists = await category
        .findOne({
          name: req.body.name,
        })
        .exec();
      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await category.save();

        res.redirect(category.url);
      }
    }
  }),
];

// @desc Update category on post
// @route /category/itemId/update
// @access Private
exports.category_update_post = asyncHandler(
  async (req, res, next) => {
    res.send("Not Implemented: category post Update");
  }
);

// @desc Update category on get
// @route /category/itemId/update
// @access Private
exports.category_update_get = asyncHandler(
  async (req, res, next) => {
    res.send("Not Implemented: category get Update");
  }
);

// @desc delete category on post
// @route /category/itemId/delete
// @access Private
exports.category_delete_post = asyncHandler(
  async (req, res, next) => {
    res.send("Not Implemented: category post delete");
  }
);

// @desc delete category on get
// @route /category/itemId/delete
// @access Private
exports.category_delete_get = asyncHandler(
  async (req, res, next) => {
    res.send("Not Implemented: category get delete");
  }
);
