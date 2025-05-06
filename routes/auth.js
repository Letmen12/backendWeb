const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');
const { registerUser } = require('../controllers/register');

// Route: POST /api/login
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;
