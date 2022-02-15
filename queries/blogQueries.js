const sql = require("../dbConnection");

const getAllBlogs = () => {
  return new Promise((res, rej) => {
    sql
      .query("SELECT * FROM posts", (err, result, fields) => {
        res(result);
      })
      .on("error", () => rej({ error: "Could not fetch all blog posts" }));
  });
};

const getSingleBlog = (blog_id) => {
  return new Promise((res, rej) => {
    sql
      .query(
        `SELECT * FROM posts WHERE post_id=${blog_id}`,
        (err, result, fields) => {
          res(result);
        }
      )
      .on("error", () => rej({ error: "Could not fetch specified blog post" }));
  });
};

const createBlog = (title, body, date, author, img) => {
  return new Promise((res, rej) => {
    sql
      .query(
        `INSERT INTO users (post_title,post_body ,post_date ,post_author ,post_img) VALUES ('${title}','${body}','${date}',${author}, '${img}')`,
        (err, result, fields) => {
          res({
            msg: "Blog has been created",
            blog_id: result.insertId,
          });
        }
      )
      .on("error", () => {
        rej({ error: "Cannot create blog post, please try again" });
      });
  });
};

const updateBlog = (post_id, post_title, post_body, post_date, post_img) => {
  let query = "UPDATE posts SET ";
  if (post_title) query += `post_title = '${post_title}', `;
  if (post_body) query += `post_body = '${post_body}', `;
  if (post_date) query += `post_date = '${post_date}', `;
  if (post_img) query += `post_img = '${post_img}' `;
  query += `WHERE post_id = ${post_id}`;
  return new Promise((res, rej) => {
    sql
      .query(query, (err, result, fields) => {
        res({
          msg: "Blog post has been updated",
          post_id,
        });
      })
      .on("error", () => rej({ error: "Couldn't update blog post" }));
  });
};

const deleteBlog = (post_id) => {
  return new Promise((res, rej) => {
    sql
      .query(
        `DELETE FROM posts WHERE post_id = ${post_id}`,
        (err, result, fields) => {
          res({ msg: "Blog post has been deleted" });
        }
      )
      .on("error", () => rej({ error: "Couldn't delete blog post" }));
  });
};

module.exports = {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
