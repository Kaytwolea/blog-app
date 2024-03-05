import express from "express";
import { addBlog, getBlog, updatePost } from "../controllers/blogController.js";

const app = express();

const router = express.Router();

router.route("/").get(getBlog).post(addBlog).patch(updatePost).get();
// router.post('/add-blog', addBlog)

export { router as Blogrouter };
