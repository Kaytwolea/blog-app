import { FileStorage } from "./FileStorage";

class Blog {
  static id = 1;
  constructor(title, content) {
    this.title = title;
    this.content = content;
    this.id = id++;
  }
  create(title, content) {
    return new Blog(title, content);
  }
  serialize() {
    return JSON.stringify({
      id: this.id,
      title: this.title,
      content: this.content,
    });
  }
}

const blog = new Blog(title, content);

const storage = new FileStorage();
let newblog = blog.create("kaytwolea", "mine");
let save = storage.save(newblog);
