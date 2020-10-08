const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create new schema
const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    authorId: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true },
    comments: [
      {
        comment: String,
        name: String
      }
    ]
  },
  {
    timestamps: true
  }
);

//new instacnce og blog schema
const Blog = mongoose.model("blog", blogSchema);

//export module
module.exports = Blog;
