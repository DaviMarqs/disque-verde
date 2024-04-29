import mongoose from "mongoose";

global.mongoose = {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  if (global.mongoose.conn) {
    console.log("DB Already Connected");
    return global.mongoose.conn;
  } else {
    const connString = process.env.NEXT_MONGODB_URI;

    const promise = mongoose.connect(connString, {
      autoIndex: true,
    });

    global.mongoose = {
      conn: await promise,
      promise,
    };

    console.log("DB Connected");
    return await promise;
  }
}
