const db = {
  users: [
    { userId: 'u1', name: 'Alice Smith', email: 'alice@example.com', pwd: 'password123', role: 'user', bookings_ids: ['b1', 'b3'], request_booking_ids: ['b5'] },
    { userId: 'u2', name: 'Bob Jones',   email: 'bob@example.com',   pwd: 'password123', role: 'user', bookings_ids: ['b2', 'b4', 'b6'], request_booking_ids: [] },
    { userId: 'o1', name: 'Carol Owner', email: 'carol@example.com', pwd: 'password123', role: 'owner', bookings_ids: [], request_booking_ids: [] },
    { userId: 'o2', name: 'Dave Owner',  email: 'dave@example.com',  pwd: 'password123', role: 'owner', bookings_ids: [], request_booking_ids: [] },
    { userId: 'o3', name: 'Eve Owner',   email: 'eve@example.com',   pwd: 'password123', role: 'owner', bookings_ids: [], request_booking_ids: [] },
    { userId: 'o4', name: 'Frank Owner', email: 'frank@example.com', pwd: 'password123', role: 'owner', bookings_ids: ['b7'], request_booking_ids: [] },
    { userId: 'o5', name: 'Grace Owner', email: 'grace@example.com', pwd: 'password123', role: 'owner', bookings_ids: [], request_booking_ids: [] },
  ],

  owners: [
    {
      userId:           'o1',
      public_id:        'd290f1ee-6c54-4b01-90e6-d701748f0851',
      has_active_slot:  true,
      active_slots:     [1, 2],
      private_slots:    [3],
    },
    {
      userId:           'o2',
      public_id:        '8a514d79-9941-4560-a297-b8fdb2cba4a2',
      has_active_slot:  true,
      active_slots:     [4, 5],
      private_slots:    [],
    },
    {
      userId:           'o3',
      public_id:        'c4e75924-118e-4f36-b633-8998495bc27d',
      has_active_slot:  true,
      active_slots:     [6],
      private_slots:    [7],
    },
    {
      userId:           'o4',
      public_id:        'f9b3e12a-8745-4299-8d19-48209825b746',
      has_active_slot:  false,
      active_slots:     [],
      private_slots:    [],
    },
    {
      userId:           'o5',
      public_id:        '3b185b17-7682-4f9e-990a-a1b415a20822',
      has_active_slot:  false,
      active_slots:     [],
      private_slots:    [],
    },
  ],
 
  slots: [
    // ── Carol (o1) ──────────────────────────────────────────
    {
      slot_id:    1,
      public_id:  'a1b2c3d4-0001-4000-8000-000000000001',
      ownerId:    'o1',
      date:       '2026-04-20',
      start_time: '09:00',
      end_time:   '10:00',
      user_limit: 5,
      curr_user:  2,
      is_private: false,
      bookingIds: ['b1', 'b2'],
    },
    {
      slot_id:    2,
      public_id:  'a1b2c3d4-0002-4000-8000-000000000002',
      ownerId:    'o1',
      date:       '2026-04-21',
      start_time: '14:00',
      end_time:   '15:30',
      user_limit: 3,
      curr_user:  0,
      is_private: false,
      bookingIds: [],
    },
    {
      slot_id:    3,
      public_id:  'a1b2c3d4-0003-4000-8000-000000000003',
      ownerId:    'o1',
      date:       '2026-04-22',
      start_time: '11:00',
      end_time:   '12:00',
      user_limit: 1,
      curr_user:  0,
      is_private: true,
      bookingIds: [],
    },
 
    // ── Dave (o2) ───────────────────────────────────────────
    {
      slot_id:    4,
      public_id:  'a1b2c3d4-0004-4000-8000-000000000004',
      ownerId:    'o2',
      date:       '2026-04-20',
      start_time: '10:00',
      end_time:   '11:00',
      user_limit: 10,
      curr_user:  1, // Adjusted from 10 to match mock data
      is_private: false,
      bookingIds: ['b3'],
    },
    {
      slot_id:    5,
      public_id:  'a1b2c3d4-0005-4000-8000-000000000005',
      ownerId:    'o2',
      date:       '2026-04-23',
      start_time: '16:00',
      end_time:   '17:00',
      user_limit: 4,
      curr_user:  1,
      is_private: false,
      bookingIds: ['b4'],
    },
 
    // ── Eve (o3) ────────────────────────────────────────────
    {
      slot_id:    6,
      public_id:  'a1b2c3d4-0006-4000-8000-000000000006',
      ownerId:    'o3',
      date:       '2026-04-24',
      start_time: '08:00',
      end_time:   '09:00',
      user_limit: 6,
      curr_user:  3,
      is_private: false,
      bookingIds: ['b5', 'b6', 'b7'],
    },
    {
      slot_id:    7,
      public_id:  'a1b2c3d4-0007-4000-8000-000000000007',
      ownerId:    'o3',
      date:       '2026-04-25',
      start_time: '13:00',
      end_time:   '14:00',
      user_limit: 2,
      curr_user:  0,
      is_private: true,
      bookingIds: [],
    },
  ],
 
  bookings: [
    { id: 'b1', user_id: 'u1', slot_id: 1, is_confirmed: true },
    { id: 'b2', user_id: 'u2', slot_id: 1, is_confirmed: true },
    { id: 'b3', user_id: 'u1', slot_id: 4, is_confirmed: true },
    { id: 'b4', user_id: 'u2', slot_id: 5, is_confirmed: false },
    { id: 'b5', user_id: 'u1', slot_id: 6, is_confirmed: true },
    { id: 'b6', user_id: 'u2', slot_id: 6, is_confirmed: true },
    { id: 'b7', user_id: 'o4', slot_id: 6, is_confirmed: true }
  ],
};

module.exports = db;