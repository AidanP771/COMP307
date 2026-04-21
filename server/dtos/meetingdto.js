class MeetingDto {

  static responseForUser(r) {
    if (!r) return null;
    return {
      ownerName: r.ownerName,
      title: r.title,
      message:    r.message,
      date:       r.date,
      startTime: r.startTime,
      endTime:   r.endTime,
      
    };
  }
  
  static responseForOwner(r) {
    if (!r) return null;
    return {
      userName:  r.userName,
      message:    r.message,
      date:       r.date,
      startTime: r.startTime,
      endTime:   r.endTime,
      title: r.title,
      message: r.message,
    };
  }
}

module.exports = MeetingDto;
