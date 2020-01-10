const db = require('../db');

exports.add = ({ username, email, password }) => new Promise(async (resolve, reject) => {
    try {
    //   const { error, value } = Joi.validate({ username, email, password }, schema);
    //   if (error) {
    //     return reject(error);
    //   }
  
    //   const id = uuidv4();
      const newUser = {
        // id,
        username,
        email,
        password
      };
  
      db.get('users')
        .push(newUser)
        .write();
  
      resolve(newUser);
    }
    catch (err) {
      reject(err);
    }
  });