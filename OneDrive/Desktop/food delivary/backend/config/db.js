import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const username = 'greatestack';
    const password = encodeURIComponent('Akanksh@2004');
    const dbName = 'food-del';
   const uri = "mongodb://127.0.0.1:27017/food-del";

    await mongoose.connect(uri);

    console.log('DB Connected');
  } catch (error) {
    console.error('DB connection error:', error.message);
    process.exit(1);
  }
}