const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//(name,brand,category,imgUrl, price, stock)
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

  imageUrl: { type: String, required: false },

  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

BikeSchema.virtual("url").get(function () {
  return `/catalog/bike/${this._id}`;
});

module.exports = mongoose.model("Bike", BikeSchema);
