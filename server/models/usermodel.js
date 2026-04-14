// TODO: Replace db with Real db and appropriate function impl
const db = require('./dummy_db');

const UserModel = {
 
  findById(userId) {
    return db.users.find(user => user.userId === userId);
  },

  getActiveOwners(){
    const activeOwnerRecords = db.owners.filter(owner => owner.has_active_slot === true);
    const combinedActiveOwners = activeOwnerRecords.map(owner => {
    
        const userDetails = db.users.find(user => user.userId === owner.userId);
          return {
          ...userDetails,
          public_id: owner.public_id 
          };
    });
    return combinedActiveOwners;

  }

 
};

 
module.exports = UserModel;
 