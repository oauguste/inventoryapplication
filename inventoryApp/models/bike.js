const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BikeSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },

  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],

  price: { type: Number, required: true },
});
BikeSchema.virtual("url").get(function () {
  return `/catalog/bike/${this._id}`;
});

module.exports = mongoose.model("Bike", BikeSchema);
