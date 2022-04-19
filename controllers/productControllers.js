const Product = require("../models/Product");

module.exports.addProduct = (reqBody) => {
  console.log(reqBody);

  // create a new object
  let newProduct = new Product({
    name: reqBody.product.name,
    description: reqBody.product.description,
    price: reqBody.product.price,
  });

  // saves the created object to our database
  return newProduct.save().then((product, error) => {
    // product creation failed
    if (error) {
      return false;
    } else {
      // product creation successful
      return `Product successfully added`;
    }
  });
};

// retrieving all products
module.exports.getAllProducts = () => {
  return Product.find({}).then((result) => {
    return result;
  });
};

// retrieve all active products
module.exports.getAllActive = () => {
  return Product.find({ isActive: true }).then((result) => {
    return result;
  });
};

// retrieve specific course
module.exports.getProduct = (reqParams) => {
  return Product.findById(reqParams).then((result) => {
    return result;
  });
};

module.exports.updateProduct = (productId, reqBody) => {
  // specify the properties of the doc to be updated
  let updatedProduct = {
    name: reqBody.name,
    description: reqBody.description,
    price: reqBody.price,
  };

  // findByIdAndUpdate(id, updatesToBeApplied)
  return Product.findByIdAndUpdate(productId, updatedProduct).then(
    (product, error) => {
      // product not updated
      if (error) {
        return false;
      } else {
        // course updated successfully
        return `Product successfully updated`;
      }
    }
  );
};

// archive a product
module.exports.archiveProduct = (reqParams) => {
  let updateActiveField = {
    isActive: false,
  };
  return Product.findByIdAndUpdate(reqParams, updateActiveField).then(
    (product, error) => {
      if (error) {
        return false;
      } else {
        return `Product archived successfully.`;
      }
    }
  );
};
