import { v4 as uuidv4 } from "uuid";
import { storage } from "../index.js";
import { query, check, body, validationResult } from "express-validator";
import Blog from "../model/blog.js";

export const getBlog = async (req, res) => {
  // const data = Object.values(storage.all());
  try {
    const blogs = await Blog.find();
    return res
      .status(200)
      .json({ message: "Request successful", data: blogs, error: false });
  } catch (e) {
    res.status(500).json({ message: "Internal server error", error: true });
  }
};

export const addBlog = async (req, res) => {
  const id = req.id;
  try {
    const validator = [
      body("title").notEmpty().withMessage("Title is required").isString(),
      body("content").notEmpty().withMessage("Content is required").isString(),
    ];
    await Promise.all(validator.map((rule) => rule.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    const { title, content } = req.body;
    const result = await Blog.create({ title, content, user: id });
    if (!result) {
      res.status(500).json({ message: "Error creating blog", error: true });
    }
    res.status(201).json({
      message: "Blog created successfully",
      error: false,
      data: result,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Error saving blog", error: true });
  }
};

export const updatePost = async (req, res) => {
  const validator = [
    body("id").notEmpty().withMessage("Id is required"),
    body("title").notEmpty().withMessage("Title is required").isString(),
    body("content").notEmpty().withMessage("Content is required").isString(),
  ];
  await Promise.all(validator.map((rule) => rule.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  const { id, content, title } = req.body;
  try {
    const blog = await Blog.findOne({ _id: id });
    if (title) blog.title = title;
    if (content) blog.content = content;
    await blog.save();
    res
      .status(200)
      .json({ message: "Request successfully", data: blog, error: false });
  } catch (err) {
    res.status(500).json({ message: "Request unsuccessfully", error: false });
  }
};
export const getPost = async (req, res) => {
  const { id } = req.params;
  if (!id) res.status(400).json({ message: "Id not passed" });

  const data = await Blog.findOne({ _id: id });
  if (!data) {
    res.status(404).json({ message: "Blog not found", error: true });
  }

  res.status(200).json({ message: "Request successfully", data: data });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!id) res.status(400).json({ message: "Id not passed" });
  try {
    const count = await Blog.countDocuments({ _id: id });
    if (count === 0) {
      return res
        .status(404)
        .json({ message: "Blog post already deleted", error: true });
    }
    const data = await Blog.findOne({ _id: id });
    if (!data) {
      res.status(404).json({ message: "Cannot Delete Blog", error: true });
    }
    await data.deleteOne({ _id: id });
    return res.status(200).json({ message: "Request Successfull" });
  } catch (e) {}
};
