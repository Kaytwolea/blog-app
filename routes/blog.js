import express from "express";
import {
  addBlog,
  deletePost,
  getBlog,
  getPost,
  updatePost,
} from "../controllers/blogController.js";
import { verifyAuth } from "../middleware/verifyJwt.js";

const app = express();

const router = express.Router();

router
  .route("/")
  .get(getBlog)
  .post(verifyAuth, addBlog)
  .patch(verifyAuth, updatePost);
router.route("/:id").get(verifyAuth, getPost);
router.route("/:id").delete(verifyAuth, deletePost);
// router.post('/add-blog', addBlog)

export { router as Blogrouter };
