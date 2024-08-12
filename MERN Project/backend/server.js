const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();
const connectDatabase = require("./config/database");

//Handling uncaught error
process.on("uncaughtException", (err)=>{
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught error`);
  process.exit(1);  
});



const PORT = process.env.PORT;
const MONGO_URL = process.env.DB_URI;

//connecting to database
mongoose
  .connect(MONGO_URL)
  .then((data) => {
    console.log(`Mongo db server is connected: ${data.connection.host} `);
  })
  .catch((err) => {
    console.log(err);
  });

  
 const server = app.listen(PORT, () => {
  console.log(`server is working on http://localhost:${PORT}`);
});



// Unhandled Promise Rejection
process.on("unhandledRejection", (err) =>{
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
  server.close(()=>{
    process.exit(1);
  });
});