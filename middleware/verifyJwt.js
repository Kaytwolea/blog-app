import { sendResponse } from "../shared/sendResponse.js";
import jwt from "jsonwebtoken";

export const verifyAuth = (req, res, next) => {
  const authHeader = req.header("Authorization") || req.header("authorization");
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(403);
  const token = authHeader?.split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return res.sendStatus(403);
    const { id, role } = decoded;
    req.id = id;
    req.role = role;
    next();
  });
};
