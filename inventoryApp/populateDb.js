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
  price,
  stock
) {
  const bikeDetail = {
    name: name,
    brand: brand,
    category: category,
    price: price,
    stock: stock,
    imageUrl: `/bikePics/${name.replace(/ /g, "_")}.png`,
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
    brandCreate(0, "Trek"),
    brandCreate(1, "Giant"),
    brandCreate(2, "Specialized"),
  ]);
}

async function createBikes() {
  console.log("Adding bikes");
  let bikePromises = [];
  for (let i = 0; i < realBikes.length; i++) {
    const bikeData = realBikes[i];
    bikePromises.push(
      bikeCreate(
        i,
        bikeData.name,
        getBrand(bikeData),
        getCategory(bikeData),
        bikeData.price,
        bikeData.stock
      )
    );
  }
  await Promise.all(bikePromises);
}
function getBrand(bikeData) {
  return brands.find(
    (brand) => brand.name === bikeData.brand
  );
}
function getCategory(bikeData) {
  return categories.find(
    (category) => category.name === bikeData.category
  );
}
async function createBikeInstances() {
  console.log("Adding bike instances");
  let bikeInstancePromises = [];
  for (let i = 0; i < bikes.length; i++) {
    for (let j = 0; j < bikes[i].stock; j++) {
      bikeInstancePromises.push(
        bikeInstanceCreate(i, bikes[i])
      );
    }
  }
  await Promise.all(bikeInstancePromises);
}
const realBikes = [
  {
    name: "Trek Marlin 7",
    brand: "Trek",
    category: "Mountain",
    price: 800,
    stock: 3,
  },
  {
    name: "Trek Domane AL 3",
    brand: "Trek",
    category: "Road",
    price: 1000,
    stock: 6,
  },
  {
    name: "Trek Verve 2",
    brand: "Trek",
    category: "Hybrid",
    price: 650,
    stock: 5,
  },
  {
    name: "Giant Trance 29",
    brand: "Giant",
    category: "Mountain",
    price: 1900,
    stock: 8,
  },
  {
    name: "Giant Defy Advanced Pro",
    brand: "Giant",
    category: "Road",
    price: 3200,
    stock: 2,
  },
  {
    name: "Giant FastRoad SL 1",
    brand: "Giant",
    category: "Hybrid",
    price: 1000,
    stock: 1,
  },
  {
    name: "Specialized Rockhopper",
    brand: "Specialized",
    category: "Mountain",
    price: 500,
    stock: 7,
  },
  {
    name: "Specialized Roubaix",
    brand: "Specialized",
    category: "Road",
    price: 2200,
    stock: 12,
  },
  {
    name: "Specialized Sirrus 2.0",
    brand: "Specialized",
    category: "Hybrid",
    price: 750,
    stock: 19,
  },
  {
    name: "Trek Marlin 5",
    brand: "Trek",
    category: "Mountain",
    price: 550,
    stock: 2,
  },
  {
    name: "Trek Émonda ALR 5",
    brand: "Trek",
    category: "Road",
    price: 1800,
    stock: 5,
  },
  {
    name: "Trek FX 1",
    brand: "Trek",
    category: "Hybrid",
    price: 440,
    stock: 4,
  },
  {
    name: "Giant Talon 3",
    brand: "Giant",
    category: "Mountain",
    price: 530,
    stock: 18,
  },
  {
    name: "Giant Contend AR 4",
    brand: "Giant",
    category: "Road",
    price: 1000,
    stock: 22,
  },
  {
    name: "Giant Revolt Advanced 3",
    brand: "Giant",
    category: "Hybrid",
    price: 1800,
    stock: 7,
  },
  {
    name: "Specialized Pitch",
    brand: "Specialized",
    category: "Mountain",
    price: 500,
    stock: 12,
  },
  {
    name: "Specialized Diverge E5",
    brand: "Specialized",
    category: "Road",
    price: 1200,
    stock: 9,
  },
  {
    name: "Specialized Turbo Vado 3.0",
    brand: "Specialized",
    category: "Hybrid",
    price: 3000,
    stock: 5,
  },
  {
    name: "Giant Stance 29 2",
    brand: "Giant",
    category: "Mountain",
    price: 1500,
    stock: 3,
  },
  {
    name: "Giant TCR Advanced 1",
    brand: "Giant",
    category: "Road",
    price: 2000,
    stock: 6,
  },
];
