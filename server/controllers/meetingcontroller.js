const MeetingModel        = require('../models/meetingmodel');
const UserModel        = require('../models/usermodel');
const MeetingDto          = require('../dtos/meetingdto');
const EmailService = require('../services/emailservice.js');

const MeetingRequestController = {

  
  async create(req, res) {

    const me = await UserModel.findById(req.user.userId);

    // ========== VALIDATION ================
    const { ownerEmail,title, message, date, startTime, endTime } = req.body ?? {};
    const errors = [];
    if (typeof ownerEmail !== 'string' || !ownerEmail.trim()) errors.push('ownerEmail is required');
    if (typeof title !== 'string' || !title.trim()) errors.push('title is required');
    if (typeof message    !== 'string' || !message.trim())    errors.push('message is required');
    if (typeof date       !== 'string' || !date)              errors.push('date is required');
    if (typeof startTime !== 'string' || !startTime)        errors.push('startTime is required');
    if (typeof endTime   !== 'string' || !endTime)          errors.push('endTime is required');
    if (errors.length) return res.status(400).json({ errors });

    const owner = await UserModel.findByEmail(ownerEmail.trim());
    if (!owner || owner.role !== 'owner') return res.status(404).json({ error: 'Owner not found' });
    if (owner.userId === me.userId)       return res.status(400).json({ error: 'Cannot request a meeting with yourself' });

    // ========== MAIN fct ================
    meeting = await MeetingModel.create(me.userId, owner.userId, message.trim(), title.trim(), date, startTime, endTime );
    enrichedMeeting = {...meeting, ownerName: owner.name};

    const to = owner.email;
    const subject = `New meeting request from ${me.name}`;
    const body = `${me.name} has requested a meeting on ${date} from ${startTime} to ${endTime}.\n\n` +
        `Title:\n${title.trim()}\n\n` +
        `Message:\n${message.trim()}\n\n` +
        `Review it on your dashboard.`;

    const url = EmailService.buildMailto(to, subject, body);

    res.status(201).json({ ...MeetingDto.responseForUser(enrichedMeeting), url});
  },



};

module.exports = MeetingRequestController;
