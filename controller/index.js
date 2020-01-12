const db = require("../db");
// const adapter = new FileSync('db.json')
// const db = low(adapter)

// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')

// const adapter = new FileSync('../db/db.json')
// const db = low(adapter)

exports.add = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      //   const { error, value } = Joi.validate({ username, email, password }, schema);
      //   if (error) {
      //     return reject(error);
      //   }

      //   const id = uuidv4();
      const newUser = {
        // id,
        // username,
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

exports.skills = (arr) => 
new Promise(async (resolve, reject) => {
  try {
      let skills = db.get('skills').value();

      Object.keys(arr).forEach((key, index)=>{
        [...skills][index].number = arr[key]
     });

      db.set('skills', skills)
        .write();

      resolve('ok');
    } catch (err) {
      reject(err);
    }
  });
