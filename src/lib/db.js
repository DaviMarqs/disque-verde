import mongoose from 'mongoose';

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (global.mongoose.conn) {
    console.log("🚀 ~ DB Already Connected");
    return global.mongoose.conn;
  } else {
    const connString = process.env.NEXT_MONGODB_URI;

    if (!connString) {
      throw new Error('Please define the NEXT_MONGODB_URI environment variable inside .env');
    }

    if (!global.mongoose.promise) {
      global.mongoose.promise = mongoose.connect(connString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      }).then(mongoose => {
        return mongoose;
      });
    }
    
    global.mongoose.conn = await global.mongoose.promise;
    console.log("🚀 ~ DB Connected");
    return global.mongoose.conn;
  }
}
