// ================== AUTH =======================
// TODO: Implement login and Authorization
// TODO: Implement bearer token and middleware

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usercontroller');

/**
 * @swagger
 * auth/login:
 *   post:
 *     summary: Log in and receive the userId
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
 *         description: Returns a userId string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', UserController.login);


module.exports = router;
