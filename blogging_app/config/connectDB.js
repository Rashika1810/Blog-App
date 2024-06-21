const mongoose = require("mongoose");
const colors = require("colors");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to MongoDB database ${process.env.MONGO_URL}`.blue);
  } catch (error) {
    console.log(`mongoose error ${error}`.red);
  }
};

module.exports = connectDb;
