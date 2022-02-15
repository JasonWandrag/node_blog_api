const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const blogRouter = require("./routes/blogRouter");
const commentRouter = require("./routes/commentRouter");
const contactRouter = require("./routes/contactRouter");

const app = express();
app.set("port", process.env.PORT || 6969);
app.use(express.json());
app.use(cors());

// This is the entry point to the API. I wanted to display a page with all the API route options available
app.get("/", (req, res) => {
  const _rootUrl = "http://" + req.get("host") + req.url;
  res.send(`
    <h1>Welcome to the Generic Blog API</h1>
    <p>Please feel free to check out any of these routes</p>
    <ul>
      <li><a href="${_rootUrl + "users"}">/users</a></li>
      <li><a href="${_rootUrl + "blogs"}">/blogs</a></li>
      <li><a href="${_rootUrl + "comments"}">/comments</a></li>
      <li><a href="${_rootUrl + "contact"}">/contact</a></li>
    </ul>
  `);
});
app.use("/contact", contactRouter);
app.use("/users", userRouter);
app.use("/blogs", blogRouter);
app.use("/comments", commentRouter);

app.listen(app.get("port"), () => {
  console.log(`Listening for calls on port ${app.get("port")}`);
  console.log("Press Ctrl+C to exit server");
});
