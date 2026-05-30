import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('YOUR_USERNAME')) {
    console.log('MongoDB URI not configured. Running with sample in-memory data.');
    return false;
  }
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.log('MongoDB connection failed. Using in-memory sample data.');
    console.log(error.message);
    return false;
  }
}
