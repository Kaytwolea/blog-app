import express from "express";
import bodyParser from "body-parser";
import { Blogrouter } from "./routes/blog.js";
import FileStorage from "./storage/FileStorage.js";
import db from "./storage/db.js";

const app = express();
const PORT = 6060;

export const storage = new FileStorage();
storage.reload();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());

app.get("/", (req, res) => {
  res.send("working");
});

app.use("/api", Blogrouter);

db()
  .then(() => {
    console.log("working");
  })
  .catch((err) => {
    console.log(err);
    console.log("Db connection err");
  });
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
