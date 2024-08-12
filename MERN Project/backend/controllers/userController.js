const Errorhandler = require("../util/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");


//Register  a user
exports.registerUser = catchAsyncErrors(async (req, res, next)=>{
    const {name, email, password} = req.body;

    const user = await  User.create({
        name,
        email,
        password,
        avatar:{
            public_id: "This is sample id",
            url: "profilepicurl"
        },
    });

    const token = user.getJWTToken();

    res.status(201).json({
        success:true,
        token,
    });
});


// Login user
exports.loginUser = catchAsyncErrors ( async (req, res, next) => {
    
})










