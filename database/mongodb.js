import mongoose, { connect } from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define the MongoDb_Uri environmental variable inside .env.<developnent/production>.locals"
  );
}

const connectToDatabase = async () => {
  try {
      await mongoose.connect(DB_URI);
      console.log(`Connect to database in ${NODE_ENV} mode`)
  } catch (error) {
    console.log("Error connecting to database", error);
  }
}

export default connectToDatabase;