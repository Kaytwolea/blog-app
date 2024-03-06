import fs from "fs";

class FileStorage {
  object = {};
  filename = "blog_file";
  constructor() {}
  all() {
    return this.object;
  }
  reload() {
    fs.readFile(this.filename, "utf8", (err, data) => {
      if (err) return err;
      this.object = JSON.parse(data);
    });
  }
  save(blog) {
    this.object[blog.id] = blog;
    fs.writeFile(this.filename, JSON.stringify(this.object), (err) => {
      if (err) return err;
      return blog;
    });
  }
  update(id, title, content) {
    this.object.map((obj) => {
      if (obj.id === id) {
        obj.title = title;
        obj.content = content;
      }
    });
  }
}

export default FileStorage;
