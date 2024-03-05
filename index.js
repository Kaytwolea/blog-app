import express from "express";
import bodyParser from "body-parser";
import { Blogrouter } from "./routes/blog.js";
import FileStorage from "./model/FileStorage.js";

const app = express();
const PORT = 6060;

export const storage = new FileStorage();
storage.reload();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("working");
});

app.use("/api", Blogrouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
