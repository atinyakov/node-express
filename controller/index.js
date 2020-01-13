const db = require("../db");

exports.add = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const newUser = {
        email,
        password
      };

      db.get("users")
        .push(newUser)
        .write();

      resolve(newUser);
    } catch (err) {
      reject(err);
    }
  });

exports.skills = arr =>
  new Promise(async (resolve, reject) => {
    try {
      let skills = db.get("skills").value();

      Object.keys(arr).forEach((key, index) => {
        [...skills][index].number = arr[key];
      });

      db.set("skills", skills).write();

      resolve("ok");
    } catch (err) {
      reject(err);
    }
  });

exports.posts = ({name, email, message}) =>
  new Promise(async (resolve, reject) => {

    try {
      const newPost = {
        name,
        email,
        message
      };

      db.get("emails")
        .push(newPost)
        .write();

      resolve(newPost);
    } catch (err) {
      reject(err);
    }
  });
