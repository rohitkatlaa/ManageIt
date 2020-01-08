const express=require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');  

// User Model
const User=require('../../models/User');

// @route POST api/users
// @desc Register a user
// @access Public
router.post('/', (req, res) => {
    const { name, email, password, userType } = req.body;
  
    // Simple validation
    if(!name || !email || !password || !userType) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    // Check for existing user
    User.findOne({ email })
      .then(user => {
        if(user) return res.status(400).json({ msg: 'User already exists' });
  
        const newUser = new User({
          name,
          userType,
          email,
          password
        });
  
        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                jwt.sign(
                  { id: user.id },
                  process.env.JWTSECRET,
                  { expiresIn: 3600 }, // token life : 1 hr
                  (err, token) => {
                  if(err) throw err;
                    res.json({
                      token,
                      user: {
                        id: user.id,
                        name: user.name,
                        userType: user.userType,
                        email: user.email
                      }
                    });
                  }
                )
              });
          })
        })
      })
  });


module.exports=router;