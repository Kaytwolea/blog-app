import { v4 as uuidv4 } from "uuid";
import { storage } from "../index.js";
import { query, check, body, validationResult } from "express-validator";

export const getBlog = async (req, res) => {
  const data = Object.values(storage.all());
  return res
    .status(200)
    .json({ message: "Request successful", data: data, error: false });
};

export const addBlog = async (req, res) => {
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
    const blog = {
      id: uuidv4(),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    storage.save(blog);
    return res
      .status(200)
      .json({ message: "Saved successfully", data: blog, error: false });
  } catch (e) {
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
  const blogs = storage.all();

  const data = blogs[id];
  if (!data) {
    res.status(404).json({ message: "Blog not found", error: true });
  }

  data.title = title;
  data.content = content;
  data.updatedAt = new Date();
  storage.save(data);
  // return res.status(200).json({ data: data });
  res.json({ message: "Request successfully", data: blogs[id] });
};
