const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error('❌ MONGO_URI is missing!');
      process.exit(1);
    }
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
};

module.exports = connectToDatabase;
