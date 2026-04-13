// TODO: Replace all db with Real db
const db = require('./dummy_db');

const UserModel = {
 
  findById(userId) {
    return db.users.find(user => user.userId === userId);
  },

};
 
module.exports = UserModel;
 