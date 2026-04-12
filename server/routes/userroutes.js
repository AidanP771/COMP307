const express = require('express');
const { authenticate } = require('./auth');
const router = express.Router();
/**
 * @swagger
 * /active:
 *   get:
 *     summary: Get all registered users who have at least one active booking
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users with active bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   name:
 *                     type: string
 *                   activeBookingCount:
 *                     type: integer
 *       401:
 *         description: Unauthorized
 */
router.get('/active', (req, res) => {
  res.status(501).send('users with active slots');
});

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId: { type: string }
 *                 name:   { type: string }
 *                 email:  { type: string }
 *                 role:   { type: string }
 *       401:
 *         description: Unauthorized
 */
router.get('/me', authenticate, (req, res) => {
  res.json(req.user.userId)
});


module.exports = router;