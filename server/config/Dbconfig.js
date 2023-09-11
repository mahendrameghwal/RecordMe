const mongoose = require("mongoose");
const CreateAsyncError = require("../CreateAsyncError");


const ConnectDB = async () => {
 const MONGO_URL = 'mongodb+srv://recorder:vJQ1D6Kmmrpsxbj7@cluster0.oiu5xv8.mongodb.net/?retryWrites=true&w=majority';
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

