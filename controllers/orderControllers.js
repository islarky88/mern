const Order = require("../models/Order");

// create an order
module.exports.createOrder = (reqBody) => {
  // create a new object
  let newOrder = new Order({
    userId: reqBody.userId,
    products: reqBody.products, // array of objects
  });

  // saves the created object to our database
  return newOrder.save().then((order, error) => {
    // order creation failed
    if (error) {
      return false;
    } else {
      // order creation successful
      return `Order successfully created`;
    }
  });
};

// get all orders
module.exports.getAllOrders = () => {
  return Order.find({}).then((result) => {
    return result;
  });
};

// get all user orders
module.exports.getUserOrders = (userId) => {
  return Order.find({ userId: userId }).then((result) => {
    return result;
  });
};
