class UserDto {

    constructor(name, email, role) {
    this.name   = name;
    this.email  = email;
    this.role   = role;
  }

  static validateUserId(userId){
    // TODO: implement validation
    return userId;
  }

  static responseUser(dbUser){
    if (!dbUser) return null;
    return new UserDto(dbUser.name, dbUser.email, dbUser.role);
}
 
  static responseUsers(dbUsers) {
    return dbUsers.map(UserDto.response_user);
  }
}
 
module.exports = UserDto;