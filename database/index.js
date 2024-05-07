const mongoose = require("mongoose");
require("dotenv").config();

exports.clientPromise = mongoose
  .connect(process.env.MONGODB_URL)
  .then(client => {
    console.log("Connected to MongoDB");
    return client;
  })
  .catch(err => {
    console.log(err);
  });
