const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controllers');

// Register a new user

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with a unique email and name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               name:
 *                 type: string
 *                 description: User's name
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: User with this email already exists
 *       '500':
 *         description: Internal server error
 */
router.post('/register', userController.registerUser);

// Login a user


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user using their email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *     responses:
 *       '200':
 *         description: User logged in successfully, returns auth token
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.post('/login', userController.loginUser);

module.exports = router;