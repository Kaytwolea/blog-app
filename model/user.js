import mongoose, { Schema, model } from "mongoose";

const { ObjectId } = mongoose.Types;

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
      required: true,
    },
    blogs: {
      type: [ObjectId],
      ref: "Blog",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
