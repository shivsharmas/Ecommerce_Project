const Product = require("../models/productModel")

//create products -- Admin
exports.createProduct = async(req, res, next)=>{
     
    const products = await Product.create(req.body);

    res.status(200).json({
        success: true,
        products
    })

}

// get all product
exports.getAllProducts = async (req, res) =>{
    
    const products = await Product.find();
    
    res.status(200).json(
        {
            success: true,
            products
        })
    
}

// update product
exports.updateProduct = async(req, res, next)=>{
    let products = await Product.findById(req.param.id);

    if(!products){
        return res.status(500).json({
            success : false,
            message: "product not found"
        })
    }
    products = await Product.findByIdAndUpdate(req.param.id, req.body, {
        new: true,
        runValidators:true,
        useFindAndModify: false
    });

    res.status(200).json({
        success:true,
        products
    })
}