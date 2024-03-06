import mongoose from "mongoose";

const db = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/myblog");
};

export default db;
