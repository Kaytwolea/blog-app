import express from "express";
import { Login, Register, getUser } from "../controllers/userController.js";
import { verifyAuth } from "../middleware/verifyJwt.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/get-user").get(verifyAuth, getUser);

export { router as AuthRouter };
