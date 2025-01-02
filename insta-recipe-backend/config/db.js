const mongoose = require('mongoose'); // helps manage relationships between objects in mongodb
const config = require('config'); // to access env variables in default.json
const db = config.get('URI'); // databse specified by URI

// attempt to connect to mongodb, and wait do so before immediately saying ERROR
const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB; // this component connects us to database