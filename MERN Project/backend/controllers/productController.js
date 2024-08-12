const Product = require("../models/productModel");
const ErrorHandler = require("../util/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../util/apifeatures");

//create products -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.create(req.body);
  
    res.status(200).json({
      success: true,
      products,
    });
  });

// get all product
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

   const apifeatures = new ApiFeatures(Product.find(), req.query)
   .search()
   .filter()
   .pagination(resultPerPage);
  const products = await apifeatures.query;
 
  res.status(200).json({
    success: true,
    products,
  });
});

// get product
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
    // return res.status(500).json({
    // success:false,
    // message:"product not found"
    // })
  }

  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});

// update product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let products = await Product.findById(req.params.id);

  if (!products) {
    return res.status(500).json({
      success: false,
      message: "product not found",
    });
  }
  products = await Product.findByIdAndUpdate(req.param.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    products,
  });
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});
