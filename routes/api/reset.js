const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//importing User Model
const User = require('../../models/User');

// @route  POST api/reset
// @desc   Reset User Password
// @access Private

router.post('/reset', auth, (req, res) => {
  const { newPassword } = req.body;
  
});

module.exports = router;
