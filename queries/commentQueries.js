const sql = require("../dbConnection");

const getAllComments = () => {
  return new Promise((res, rej) => {
    sql
      .query(`SELECT * FROM comments`, (err, result, fields) => {
        res(result);
      })
      .on("error", () => rej({ error: "Could not find comments" }));
  });
};

const getAllCommentsForBlog = (blog_id) => {
  return new Promise((res, rej) => {
    sql
      .query(
        `SELECT * FROM comments WHERE comment_post=${blog_id}`,
        (err, result, fields) => {
          res(result);
        }
      )
      .on("error", () => rej({ error: "Could not find comments" }));
  });
};

const createComment = (blog_id, comment_author, comment_text) => {
  return new Promise((res, rej) => {
    sql
      .query(
        `INSERT INTO comments (comment_author, comment_text, comment_post) VALUES ('${comment_author}','${comment_text}','${blog_id}')`,
        (err, result, fields) => {
          res({
            msg: "comment has been created",
            blog_id: result.insertId,
          });
        }
      )
      .on("error", () => {
        rej({ error: "Cannot create comment, please try again" });
      });
  });
};

const updateComment = (comment_text, comment_id) => {
  let query = "UPDATE comments SET ";
  if (com) query += `post_title = '${post_title}', `;
  if (post_body) query += `post_body = '${post_body}', `;
  if (post_date) query += `post_date = '${post_date}', `;
  if (post_img) query += `post_img = '${post_img}' `;
  query += `WHERE post_id = ${post_id}`;
  return new Promise((res, rej) => {
    sql
      .query(
        `UPDATE comments SET comment_text = '${comment_text} WHERE comment_id=${comment_id}'`,
        (err, result, fields) => {
          res({
            msg: "Blog post has been updated",
            comment_id,
          });
        }
      )
      .on("error", () => rej({ error: "Couldn't update comment" }));
  });
};

const deleteComment = (comment_id) => {
  return new Promise((res, rej) => {
    sql
      .query(
        `DELETE FROM comments WHERE comment_id = ${comment_id}`,
        (err, result, fields) => {
          res({ msg: "Comment has been deleted" });
        }
      )
      .on("error", () => rej({ error: "Couldn't delete comment" }));
  });
};

module.exports = {
  getAllComments,
  getAllCommentsForBlog,
  createComment,
  updateComment,
  deleteComment,
};
