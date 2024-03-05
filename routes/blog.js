import express from "express";
import {
  addBlog,
  deletePost,
  getBlog,
  getPost,
  updatePost,
} from "../controllers/blogController.js";

const app = express();

const router = express.Router();

router.route("/").get(getBlog).post(addBlog).patch(updatePost);
router.route("/:id").get(getPost);
router.route("/:id").delete(deletePost);
// router.post('/add-blog', addBlog)

export { router as Blogrouter };
