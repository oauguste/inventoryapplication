#! /usr/bin/env node

console.log(
  'This script populates test bikes, brands, categories, and bike instances to your database. Specified database as argument - e.g.: populatedb "mongodb://yourMongoDBURL"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Bike = require("./models/bike");
const Brand = require("./models/brand");
const BikeInstance = require("./models/bikeinstance");
const Category = require("./models/category");

const brands = [];
const bikes = [];
const bikeinstances = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories(); // Move this before createBikes
  await createBrands();
  await createBikes();
  await createBikeInstances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function brandCreate(index, name) {
  const brand = new Brand({ name: name });
  await brand.save();
  brands[index] = brand; // corrected variable
  console.log(`Added brand: ${name}`);
}

async function bikeCreate(
  index,
  name,
  brand,
  category,
  price
) {
  const bikeDetail = {
    name: name,
    brand: brand,
    category: category,
    price: price,
  };
  const bike = new Bike(bikeDetail);
  await bike.save();
  bikes[index] = bike;
  console.log(`Added bike: ${name}`);
}

async function bikeInstanceCreate(index, bike) {
  const bikeInstanceDetail = { bike: bike };
  const bikeInstance = new BikeInstance(bikeInstanceDetail);
  await bikeInstance.save();
  bikeinstances[index] = bikeInstance;
  console.log(`Added bike instance for: ${bike.name}`);
}

async function categoryCreate(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Mountain"),
    categoryCreate(1, "Road"),
    categoryCreate(2, "Hybrid"),
  ]);
}

async function createBrands() {
  console.log("Adding brands");
  await Promise.all([
    brandCreate(0, "BrandA"),
    brandCreate(1, "BrandB"),
    brandCreate(2, "BrandC"),
  ]);
}

async function createBikes() {
  console.log("Adding bikes");
  await Promise.all([
    bikeCreate(
      0,
      "BikeModel1",
      brands[0],
      categories[0],
      1000
    ),
    bikeCreate(
      1,
      "BikeModel2",
      brands[1],
      categories[1],
      1500
    ),
    bikeCreate(
      2,
      "BikeModel3",
      brands[2],
      categories[2],
      2000
    ),
  ]);
}

async function createBikeInstances() {
  console.log("Adding bike instances");
  await Promise.all([
    bikeInstanceCreate(0, bikes[0]),
    bikeInstanceCreate(1, bikes[1]),
    bikeInstanceCreate(2, bikes[2]),
  ]);
}
