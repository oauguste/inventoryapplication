const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BikeSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  brand: { type: String, required: true, maxLength: 50 },
  price: { type: Number, required: true },
});
