const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product name"],
        trim: true
    },
    description:{
        type:String,
        required:  [true, "Please Enter Description name"]
    },
    price:{
        type: Number,
        required:  [true, "Please Enter product price"],
        maxLength: [8, "price cannot  exceed 8 characters"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
       {
        public_id :{
            type:String,
            required: true
        },
        url:{
            type:String,
            required: true
        }
       }
    ],
    category: {
        type:String,
        required: [true, "Please Enter Product Category"],

    },
    stock : {
        type:Number,
        required: [true, "Please Enter Product Stock"],
        maxLength: [4, "stock can not exceed 4 character"],
        default: 1
    },
    reviews: [
        {
            name: {
                type:String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createAt:{
        type: Date,
        default: Date.now
    }

})



module.exports = mongoose.model("Product",productSchema)