const express=require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');  
const auth=require('../../middleware/auth');

// User Model
const User=require('../../models/User');

// @route POST api/users
// @desc Register a user
// @access Private
router.post('/',auth,(req, res) => {
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


// @route POST api/users/multiple
// @desc Mass registration of users
// @access Private
// router.post('/multiple/',auth,(req, res) => {
router.post('/multiple/',(req, res) => {
  const { emailIds } = req.body;

  // Simple validation
  if(!emailIds) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }


  // Check for existing users
  User.find({
    email: { $in: emailIds}
  }).then(users => {
    usersEmail = users.map(x => x.email)
    if (users.length !== 0) {
      return res.status(400).json({ msg: 'The following users aldready exists:' + usersEmail.join() });
    }
  

    function generatePassword() {
      var length = 8,
          charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          retVal = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
          retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      return retVal;
    }

    var users = emailIds.map(element => {
      const newUser = {
        name: element.split('@')[0],
        userType: 'student',
        email: element,
        password: generatePassword()
      };
      return newUser;
    });
    var users_with_hash_password = []
    var prom = new Promise((resolve,reject) =>{
      users.forEach((value, index, array) => {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(value.password, salt, (err, hash) => {
            if(err) throw err;
            users_with_hash_password.push({
              name: value.name,
              userType: value.userType,
              email: value.email,
              password: hash
            })
            if (array.length === users_with_hash_password.length) resolve();
          });
        });
      });
    });
    prom.then(() => {
      res.json(users)
      // User.insertMany(users_with_hash_password)
      // .then(user => {
      //   return res.json(users);
      // });
    })
  })
});


module.exports=router;