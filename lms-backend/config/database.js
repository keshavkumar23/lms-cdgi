const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URL } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`DB Connection Successful`);
    })
    .catch((err) => {
      console.error(`DB Connection Failed`);
      console.error(err);
      process.exit(1); // Exit the process if connection fails
    });
};
