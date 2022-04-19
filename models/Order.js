const mongoose = require("mongoose");

//create Order schema
const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "UserId is required"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  products: [
    {
      productId: {
        type: String,
        required: [true, "ProductId is required"],
      },
      name: {
        type: String,
        required: [true, "Product name is required"],
      },
      description: {
        type: String,
        required: [true, "Product description is required"],
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required"],
      },
      price: {
        type: Number,
        required: [true, "Price is required"],
      },
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
