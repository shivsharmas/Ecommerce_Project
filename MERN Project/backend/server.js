const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();
const connectDatabase = require("./config/database");

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

app.listen(PORT, () => {
  console.log(`server is working on http://localhost:${PORT}`);
});
