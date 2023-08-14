const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BikeInstanceSchema = new Schema({
  bike: {
    type: Schema.Types.ObjectId,
    ref: "Bike",
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: [
      "In Stock",
      "Sold",
      "Reserved",
      "Out for Repair",
    ],
    default: "In Stock",
  },
  purchaseDate: { type: Date },
});
BikeInstanceSchema.virtual("url").get(function () {
  return `/catalog/bikeinstance/${this._id}`;
});

module.exports = mongoose.model(
  "BikeInstance",
  BikeInstanceSchema
);
