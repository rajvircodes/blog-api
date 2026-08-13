const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected success!");
  } catch (error) {
    console.error("Database error:-", error);

    process.exit(1);
  }
};

module.exports = connectDB;
