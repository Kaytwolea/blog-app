import bcrypt from "bcrypt";
import vine, { errors } from "@vinejs/vine";
import { RegisterSchema } from "../schemas/registerSchema.js";
import User from "../model/user.js";
import { response } from "express";
import { loginSchema } from "../schemas/loginSchema.js";
import { sendResponse } from "../shared/sendResponse.js";
import { generateToken } from "../shared/generateToken.js";

export const Register = async (req, res) => {
  const data = req.body;
  try {
    const validator = vine.compile(RegisterSchema);
    const output = await validator.validate(data);
    const hashed = await bcrypt.hash(output.password, 10);
    const user = await User.create({ ...output, password: hashed });
    if (!user) {
      res
        .status(400)
        .json({ message: "Error creating user", data: null, error: true });
    }
    res.status(201).json({
      message: "Account created successfully",
      data: null,
      error: false,
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      const errorMessages = error?.messages?.map((error) => error?.message);
      res.status(422).json({ message: errorMessages, data: null, error: true });
    } else if (
      error?.code === 11000 &&
      error?.keyPattern &&
      error?.keyPattern?.email
    ) {
      res
        .status(400)
        .json({ message: "Email already exists", data: null, error: true });
    } else {
      console.error("Error creating user:", error);
      res
        .status(400)
        .json({ message: "Error creating user", data: null, error: true });
    }
  }
};

export const Login = async (req, res) => {
  const data = req.body;
  const validator = vine.compile(loginSchema);
  try {
    const output = await validator.validate(data);
    const { email, password } = output;
    const user = await User.findOne({ email });
    if (!user) {
      sendResponse(res, "User not found", null, true, 400);
    }
    const validatePassword = await bcrypt.compare(password, user?.password);
    if (!validatePassword) {
      sendResponse(res, "Incorrect password", null, true, 400);
    }
    const token = await generateToken(user);
    const resUser = await await User.findOne({ email })
      .select("-password")
      .populate("blogs");
    sendResponse(
      res,
      "Login successful",
      { resUser, token: token },
      false,
      200
    );
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      const errorMessages = error?.messages?.map((error) => error?.message);
      sendResponse(res, errorMessages, null, true, 422);
    } else {
      console.error("Error Logging in", error);
      res
        .status(400)
        .json({ message: "Error Loging in", data: error, error: true });
    }
  }
};

export const getUser = async (req, res) => {
  const id = req.id;
  if (!id) return sendResponse(res, "Unauthorized", null, true, 401);
  const user = await User.findOne({ _id: id })
    .select("-password")
    .populate("blogs");
  if (!user) return sendResponse(res, "User not found", null, true, 401);
  return sendResponse(res, "User returned successfully", { user }, false, 200);
};
