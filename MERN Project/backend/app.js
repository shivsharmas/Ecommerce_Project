const express = require("express");
const app = express();

const errorMiddleware = require("../backend/middleware/error")

app.use(express.json());

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes")

app.use("/api/v1", product);
app.use("/api/v1", user)


// middleware for Error
app.use(errorMiddleware);

module.exports = app;
