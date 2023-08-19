const express = require("express");
const router = express.Router();

const brand_controller = require("../controllers/brandController");
const category_controller = require("../controllers/categoryController");
const bike_controller = require("../controllers/bikeController");
const bike_instance_controller = require("../controllers/bikeInstanceController");

//Routes

// router.get("/bikes", bike_controller.bike_list);
// router.get("/bike/:itemId", bike_controller.bike_detail);

/// BIKE ROUTES ///

// GET catalog home page.
router.get("/", bike_controller.index);

// GET request for creating a bike. NOTE This must come before routes that display bike (uses id).
router.get("/bike/create", bike_controller.bike_create_get);

// POST request for creating bike.
router.post(
  "/bike/create",
  bike_controller.bike_create_post
);

// GET request to delete bike.
router.get(
  "/bike/:id/delete",
  bike_controller.bike_delete_get
);

// POST request to delete bike.
router.post(
  "/bike/:id/delete",
  bike_controller.bike_delete_post
);

// GET request to update bike.
router.get(
  "/bike/:id/update",
  bike_controller.bike_update_get
);

// POST request to update bike.
router.post(
  "/bike/:id/update",
  bike_controller.bike_update_post
);

// GET request for one bike.
router.get("/bike/:id", bike_controller.bike_detail);

// GET request for list of all bike items.
router.get("/bikes", bike_controller.bike_list);

/// brand ROUTES ///

// GET request for creating brand. NOTE This must come before route for id (i.e. display brand).
router.get(
  "/brand/create",
  brand_controller.brand_create_get
);

// POST request for creating brand.
router.post(
  "/brand/create",
  brand_controller.brand_create_post
);

// GET request to delete brand.
router.get(
  "/brand/:id/delete",
  brand_controller.brand_delete_get
);

// POST request to delete brand.
router.post(
  "/brand/:id/delete",
  brand_controller.brand_delete_post
);

// GET request to update brand.
router.get(
  "/brand/:id/update",
  brand_controller.brand_update_get
);

// POST request to update brand.
router.post(
  "/brand/:id/update",
  brand_controller.brand_update_post
);

// GET request for one brand.
router.get("/brand/:id", brand_controller.brand_detail);

// GET request for list of all brands.
router.get("/brands", brand_controller.brand_list);

/// category ROUTES ///

// GET request for creating a category. NOTE This must come before route that displays category (uses id).
router.get(
  "/category/create",
  category_controller.category_create_get
);

//POST request for creating category.
router.post(
  "/category/create",
  category_controller.category_create_post
);

// GET request to delete category.
router.get(
  "/category/:id/delete",
  category_controller.category_delete_get
);

// POST request to delete category.
router.post(
  "/category/:id/delete",
  category_controller.category_delete_post
);

// GET request to update category.
router.get(
  "/category/:id/update",
  category_controller.category_update_get
);

// POST request to update category.
router.post(
  "/category/:id/update",
  category_controller.category_update_post
);

// GET request for one category.
router.get(
  "/category/:id",
  category_controller.category_detail
);

// GET request for list of all category.
router.get(
  "/categories",
  category_controller.category_list
);

/// bikeINSTANCE ROUTES ///

// GET request for creating a bikeInstance. NOTE This must come before route that displays bikeInstance (uses id).
router.get(
  "/bikeinstance/create",
  bike_instance_controller.bikeInstance_create_get
);

// POST request for creating bikeInstance.
router.post(
  "/bikeinstance/create",
  bike_instance_controller.bikeInstance_create_post
);

// GET request to delete bikeInstance.
router.get(
  "/bikeinstance/:id/delete",
  bike_instance_controller.bikeInstance_delete_get
);

// POST request to delete bikeInstance.
router.post(
  "/bikeinstance/:id/delete",
  bike_instance_controller.bikeInstance_delete_post
);

// GET request to update bikeInstance.
router.get(
  "/bikeinstance/:id/update",
  bike_instance_controller.bikeInstance_update_get
);

// POST request to update bikeInstance.
router.post(
  "/bikeinstance/:id/update",
  bike_instance_controller.bikeInstance_update_post
);

// GET request for one bikeInstance.
router.get(
  "/bikeinstance/:id",
  bike_instance_controller.bikeInstance_detail
);

// GET request for list of all bikeInstance.
router.get(
  "/bikeinstances",
  bike_instance_controller.bikeInstance_list
);

module.exports = router;
