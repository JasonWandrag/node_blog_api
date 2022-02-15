const express = require("express");
const router = express.Router();

const blogQueries = require("../queries/blogQueries");

// Get all blog posts
router.get("/", (req, res) => {
  blogQueries
    .getAllBlogs()
    .then((blogs) => res.send(blogs))
    .catch((e) => res.status(400).send({ error: "Could not load blogs " }));
});

// Get single Blog
router.get("/:id", (req, res, next) => {
  blogQueries
    .getSingleBlog(req.params.id)
    .then((blog) => res.send(bl0g[0]))
    .catch((e) => res.status(404).send({ error: "Blog post not found" }));
});

// Create Blog
router.post("/", (req, res, next) => {
  const { title, body, date, author, img } = req.body;
  if (!title || !body || !date || !author || !img)
    res
      .status(400)
      .send({ error: "Not all data submitted. Blog creation failed" });

  blogQueries
    .createBlog(title, body, date, author, img)
    .then((createdBlog) => blogQueries.getSingleBlog(createdBlog.blog_id))
    .then((blog) => res.send(blog))
    .catch((err) =>
      res
        .status(400)
        .send({ error: "Could not create blog due to query error" })
    );
});

// Update blog
router.put("/:id", (req, res, next) => {
  const { title, body, date, img } = req.body;
  blogQueries
    .updateBlog(req.params.id, title, body, date, img)
    .then((updatedBlog) => blogQueries.getSingleBlog(updatedBlog.post_id))
    .then((blog) => res.send(blog))
    .catch((e) =>
      res.status(400).send({ error: "Could not update specified blog post" })
    );
});

// Delete Blog
router.delete("/:id", (req, res, next) => {
  blogQueries
    .deleteBlog(req.params.id)
    .then((msg) => res.send(msg))
    .catch((e) =>
      res.status(400).send({ error: "Could not delete blog post" })
    );
});

router.post("/", (req, res, next) => {});

module.exports = router;
