const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productControllers");

const auth = require("../auth");

// creating/adding a product
router.post("/", auth.verify, (req, res) => {
  const data = {
    product: req.body,
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };

  if (data.isAdmin) {
    ProductController.addProduct(data).then((result) => res.send(result));
  } else {
    res.send({
      auth: "Product submission failed. Only admins can add products",
    });
  }
});

// retrieving all products
router.get("/all", (req, res) => {
  ProductController.getAllProducts().then((result) => res.send(result));
});

// retrieving all active products
router.get("/", (req, res) => {
  ProductController.getAllActive().then((result) => res.send(result));
});

// retrieving a specific product
router.get("/:productId", (req, res) => {
  console.log(req.params.productId);
  ProductController.getProduct(req.params.productId).then((result) =>
    res.send(result)
  );
});

//1 update a product
router.put("/:productId", auth.verify, (req, res) => {
  const data = {
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };
  if (data.isAdmin) {
    ProductController.updateProduct(req.params.productId, req.body).then(
      (result) => res.send(result)
    );
  } else {
    res.send(false);
  }
});

// archive a product
router.put("/:id/archive", auth.verify, (req, res) => {
  const data = {
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };

  if (data.isAdmin) {
    ProductController.archiveProduct(req.params.productId).then((result) =>
      res.send(result)
    );
  } else {
    res.send(false);
  }
});

module.exports = router;
