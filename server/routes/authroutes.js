// ================== AUTH =======================
// TODO: Implement login and Authorization
// TODO: Implement bearer token and middleware
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const DUMMY_SECRET_TOKEN = process.env.DUMMY_SECRET_TOKEN;
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * auth/login:
 *   post:
 *     summary: Log in and returns a userId
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:    { type: string, example: jackie.chen@mail.mcgill.ca }
 *               password: { type: string, example: password123 }
 *     responses:
 *       200:
 *         description: Returns the userId 
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', (req, res) => {

   res.status(200).json({userId: "u1"})
});



module.exports = router;
