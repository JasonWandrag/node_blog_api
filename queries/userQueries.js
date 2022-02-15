const sql = require("../dbConnection");

const getAllUsers = () => {
  return new Promise((res, rej) => {
    sql
      .query(
        "SELECT user_id, user_name, user_email, user_contact, user_about, user_avatar FROM users",
        (err, result, fields) => {
          res(result);
        }
      )
      .on("error", () => rej({ error: "Could not fetch all users" }));
  });
};

const getSingleUser = (user_id) => {
  return new Promise((res, rej) => {
    sql
      .query(
        `SELECT user_id, user_name, user_email, user_contact, user_about, user_avatar FROM users WHERE user_id=${user_id}`,
        (err, result, fields) => {
          res(result);
        }
      )
      .on("error", () => rej({ error: "Could not find user" }));
  });
};

const registerUser = (user_name, user_email, user_contact, user_password) => {
  return new Promise((res, rej) => {
    sql
      .query(
        `INSERT INTO users (user_name, user_email, user_contact, user_password) VALUES ('${user_name}','${user_email}','${user_contact}','${user_password}')`,
        (err, result, fields) => {
          res({
            msg: "User has been registered",
            user_id: result.insertId,
          });
        }
      )
      .on("error", () => {
        rej({ error: "User already registered, please log in" });
      });
  });
};

const signInUser = (user_email, user_password) => {
  return new Promise((res, rej) => {
    sql
      .query(
        `SELECT user_id, user_name, user_email, user_contact, user_about, user_avatar FROM users WHERE user_email='${user_email}' AND user_password='${user_password}'`,
        (err, result, fields) => {
          res(result);
        }
      )
      .on("error", () => rej({ error: "Invalid Credentials" }));
  });
};

const updateUser = (
  user_id,
  user_name,
  user_email,
  user_contact,
  user_password,
  user_avatar,
  user_about
) => {
  let query = "UPDATE users SET ";
  if (user_name) query += `user_name = '${user_name}', `;
  if (user_email) query += `user_email = '${user_email}', `;
  if (user_contact) query += `user_contact = '${user_contact}', `;
  if (user_password) query += `user_password = '${user_password}', `;
  if (user_avatar) query += `user_avatar = '${user_avatar}', `;
  if (user_about) query += `user_about = '${user_about}' `;
  query += `WHERE user_id = ${user_id}`;
  return new Promise((res, rej) => {
    sql
      .query(query, (err, result, fields) => {
        res({
          msg: "User has been updated",
          user_id,
        });
      })
      .on("error", () => rej({ error: "Couldn't update user details" }));
  });
};

const deleteUser = (user_id) => {
  return new Promise((res, rej) => {
    sql
      .query(
        `DELETE FROM users WHERE user_id = ${user_id}`,
        (err, result, fields) => {
          res({ msg: "User has been deleted" });
        }
      )
      .on("error", () => rej({ error: "Couldn't delete user" }));
  });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  registerUser,
  signInUser,
  updateUser,
  deleteUser,
};
