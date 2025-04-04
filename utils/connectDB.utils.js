import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, { dbName: "ConvoConnect" })
    .then(() => {
      console.log("Connected to mongo db successfully");
    })
    .catch((err) => {
      console.log("error in connecting to mongodb => ", err);
    });
};

export { connectDB };
