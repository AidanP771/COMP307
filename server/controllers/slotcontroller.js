const SlotModel    = require('../models/slotmodel');
const UserModel    = require('../models/usermodel');
const SlotDto = require('../dtos/slotdto');
 
const SlotController = {

  getAvailableByOwner(req, res) {
    const owner = UserModel.findOwnerByPublicId(req.params.owner_id);
    if (!owner) return res.status(404).json({ errors: ['Owner not found'] });
    const slots = SlotModel.getActiveByOwner(owner.userId);
    res.json(SlotDto.responseSlots(slots));
  },
 
  
};
 
module.exports = SlotController;