const db = require('./dummy_db');

const BookingModel = {
  
   findByUser(userId) {
    const user = db.users.find(u => u.userId === userId);
    if (!user) return [];

    const resolve = (bookingId, status) => {
      const booking = db.bookings.find(b => b.id === bookingId);
      if (!booking) return null;
      const slot  = db.slots.find(s => s.slot_id === booking.slot_id) ?? null;
      const owner = slot ? db.users.find(u => u.userId === slot.ownerId) ?? null : null;
      return { ...booking, status, slot, owner };
    };

    const confirmed   = (user.bookings_ids        ?? []).map(id => resolve(id, 'confirmed'));
    const unconfirmed = (user.request_booking_ids ?? []).map(id => resolve(id, 'unconfirmed'));

    return [...confirmed, ...unconfirmed].filter(Boolean);
  },


// ================== TO IMPLEMENT =============================
  create() {
    return;
  },

  delete(bookingId) {
    return;
  },
};

module.exports = BookingModel;