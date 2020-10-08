const router = require("express").Router();
let Blog = require("../models/blog.model");

//GET all blog posts
router.get("/", (req, res) => {
  //find all the blogs and then show it in json formate, if anything bad happens catch it and show the error message

  Blog.find()
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json("Error: " + err));
});

//GET one blog post
//same as GET all post, except for this time we will use id to get one specific blog post
router.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then(blog => res.json(blog))
    .catch(err => res.status(400).json("Error: " + err));
});

//POST a blog post
router.post("/", (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const authorId = req.body.authorId;
  const content = req.body.content;
  const date = Date.parse(req.body.date);
  //now, create a new blog post with the above values in the blog schema
  const newBlog = new Blog({
    title,
    author,
    authorId,
    content,
    date
  });
  newBlog
    .save()
    .then(newBlog => res.json(newBlog))
    .catch(err => res.status(400).json("Error creating new blog post: " + err));
});

// update a blog post
router.put("/:id", (req, res) => {
  Blog.findByIdAndUpdate(req.params.id)
    .then(blog => {
      //i will allow to chnage only the titile and content
      blog.title = req.body.title;
      blog.content = req.body.content;

      blog
        .save()
        .then(blog => res.json(blog))
        .catch(err => res.status(400).json("Error:" + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

//DELETE a blog post
router.delete("/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(res.send({ message: "Post successfully deleted!" }))
    .catch(err => res.status(400).json("Error: " + err));
});

//POST a comment on a blog post
router.post("/:id/comments", (req, res) => {
  //get the blog of for :id
  Blog.findById(req.params.id)
    .then(blog => {
      //create a comments array with new comment
      const comments = blog.comments.concat({
        comment: req.body.comment,
        name: req.body.name
      });

      //update the blog with comments array
      blog.comments = comments;

      //save the blog with updated comments
      blog
        .save()
        .then(blog => res.json(blog))
        .catch(err => {
          console.log(err);
          return res.status(400).json("Error: " + err);
        });
    })
    .catch(err => res.status(400).json("error" + err));
});

//after all the routes export the module
module.exports = router;
