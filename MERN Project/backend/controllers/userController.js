const Errorhandler = require("../util/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../util/errorHandler");


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

    const {email, password} = req.body;

    //  check if user has given password and email both
    if(!email || !password){
        return next(new Errorhandler("please enter email and password", 400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new Errorhandler("Invalid Email id and password", 401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email and password", 401));
    }

    const token = user.getJWTToken();

    res.status(200).json({
        success:true,
        token,
    });
});










