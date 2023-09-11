const mongoose = require("mongoose");


const ConnectDB = async () => {
 const MONGO_URL = process.env.MONGO_URL;
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
   console.log('Connected to database Successfully ✨' );
  } catch (err) {
  console.log('Database connection error ⚠️',err.message);
  }
};

module.exports = ConnectDB;

