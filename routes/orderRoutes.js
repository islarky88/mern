const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/orderControllers");

const auth = require("../auth");

// create an order
router.post("/create-order", auth.verify, (req, res) => {
  const isAdmin = auth.decode(req.headers.authorization).isAdmin;

  // const sampleReqBody = {
  //   userId: req.body.userId,
  //   products: [
  //     {
  //       productId: "5e9f8f8f8f8f8f8f8f8f8f8",
  //       name: "Product 1",
  //       description: "Product 1 description",
  //       quantity: 1,
  //       price: 100,
  //     },
  //     {
  //       productId: "5e9f8f8f8f8f8f8f8f8f8f8",
  //       name: "Product 2",
  //       description: "Product 2 description",
  //       quantity: 2,
  //       price: 200,
  //     },
  //   ],
  // };

  if (!isAdmin) {
    OrderController.createOrder(req.body).then((result) => res.send(result));
  } else {
    res.send({ auth: "Order submission failed. Only admins can add orders" });
  }
});

// retrieve all order only for admin
router.get("/get-all-orders", auth.verify, (req, res) => {
  const isAdmin = auth.decode(req.headers.authorization).isAdmin;

  if (isAdmin) {
    OrderController.getAllOrders().then((result) => res.send(result));
  } else {
    res.send({
      auth: "Order retrieval failed. Only admins can retrieve orders",
    });
  }
});

// retrieve all orders by user
router.get("/:userId/orders", auth.verify, (req, res) => {
  const currentUserId = auth.decode(req.headers.authorization).id;

  if (currentUserId === req.params.userId) {
    OrderController.getUserOrders(req.params.userId).then((result) =>
      res.send(result)
    );
  } else {
    res.send({
      auth: "Order retrieval failed. Only the user can retrieve orders",
    });
  }
});
