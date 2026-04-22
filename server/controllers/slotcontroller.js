const SlotModel    = require('../models/slotmodel');
const UserModel    = require('../models/usermodel');
const BookingModel = require('../models/bookingmodel');
const SlotDto = require('../dtos/slotdto');
const EmailService = require('../services/emailservice');

const SlotController = {

  async getAvailableByOwner(req, res) {
    const owner = await UserModel.findOwnerByPublicId(req.params.ownerId);
    if (!owner) return res.status(404).json({ errors: ['Owner not found'] });

    const slots = await SlotModel.getActiveByOwner(owner.userId);

    res.json(SlotDto.responseSlots(slots));
  },

  async create(req, res) {

    const ownerId = req.user.userId;
    const owner = await UserModel.findById(ownerId);
    if (owner.role !== "owner") {
      return res.status(403).json({ error: 'Owner role required' });
    }

    const errors = [];
    const { date, startTime, endTime, title } = req.body ?? {};
    if (typeof title !== 'string' || title.trim() === '') errors.push('title is required');
    if (typeof date !== 'string' || date.trim() === '') errors.push('date is required');
    if (typeof startTime !== 'string' || startTime.trim() === '') errors.push('startTime is required');
    if (typeof endTime !== 'string' || endTime.trim() === '') errors.push('endTime is required');
    if (errors.length) return res.status(400).json({ error: error[0] });
   

    const slot = await SlotModel.create(ownerId, date, startTime, endTime, title, false, true); // isBooked = false, isPrivate = true
    res.status(201).json(SlotDto.responseSlot(slot));
  },

  async getOwned(req, res) {

    const ownerId = req.user.userId;
    const owner = await UserModel.findById(ownerId);

    if (owner.role !== 'owner') {
      return res.status(403).json({ error: 'Owner role required' });
    }

    const slots = await SlotModel.getAllSlots(ownerId);
    const bookingIds = await UserModel.getAllBookingIds(ownerId);
    const bookings = await BookingModel.getListBooking(bookingIds);
    
    res.status(200).json(SlotDto.responseSlotsAndBooking(slots, bookings));
  },

  async activate(req, res) {
    const slot = await SlotModel.findById(req.body.slotId);
    if (!slot) return res.status(404).json({ error: 'Slot not found' });
    if (slot.ownerId !== req.user.userId) {
      return res.status(403).json({ error: 'Only the owner can activate this slot' });
    }

    const updated = await SlotModel.setActive(slot.slotId);
    res.json(SlotDto.responseSlot(updated));
  },
};

module.exports = SlotController;
