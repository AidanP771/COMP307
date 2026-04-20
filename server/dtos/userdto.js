class UserDto {

    constructor(dbUser) {
    this.name   = dbUser.name;
    this.email  = dbUser.email;
    this.job   = dbUser.job;

    if(dbUser.public_id!=null){
        this.public_id = dbUser.public_id;
    }
  }

  static responseUser(dbUser){
    if (!dbUser) return null;
    return new UserDto(dbUser);
}
 
  static responseUsers(dbUsers) {
    return dbUsers.map(UserDto.responseUser);
  }
}
 
module.exports = UserDto;
