import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the NEXT_MONGODB_URI environment variable inside .env"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  console.log("Connected to MongoDB");
  return cached.conn;
}

export default dbConnect;
