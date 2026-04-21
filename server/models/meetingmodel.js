const { getDB } = require('../db');
const genId = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
const SlotModel     = require('./slotmodel');
const BookingModel  = require('./bookingmodel');
const UserModel = require('./usermodel');


const MeetingModel = {

  async create(userId, ownerId, message, title, date, startTime, endTime) {
    const db = getDB();
    const meetingId = genId();
    const meeting = {
      meetingId:  meetingId,
      userId,
      ownerId,
      title,
      message,
      date,
      startTime,
      endTime,
    };
    await db.collection('meetings').insertOne(meeting)

    UserModel.addMeeting(userId, meetingId);
    UserModel.addMeeting(ownerId, meetingId);
    
    return meeting;
  },

  async getMeetings(meetingIds){
    const db = getDB();
    const meetings = db.collection('meetings').find({
        meetingId: {$in: meetingIds}
    }).toArray();
    return meetings
  }
 
};

module.exports = MeetingModel;
