class SlotResponseDto {
  constructor(slot) {
    this.title   = slot.title;
    this.date        = slot.date;
    this.startTime   = slot.startTime;
    this.endTime     = slot.endTime;
  }
 
  static responseSlot(dbSlot){
    if (!dbSlot) return null;
    return new SlotResponseDto(dbSlot);
}
 
  static responseSlots(dbSlots) {
    return dbSlots.map(SlotResponseDto.responseSlot);
  }
}
 


module.exports = SlotResponseDto
