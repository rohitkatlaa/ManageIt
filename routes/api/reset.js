const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const auth = require('../../middleware/auth');

//importing User Model
const User = require('../../models/User');

// @route  POST api/reset
// @desc   Reset User Password
// @access Private

router.post('/', auth, (req, res) => {
  const { newPassword } = req.body;
  if(!newPassword){
    return res.status(400).send({msg: "Field cannot be empty"});
  }

  User.findById(req.user.id)
      .then(user => {
        if(!user) return res.status(400).send({msg: 'Unauthorized!'});

        if(req.body.newPassword === req.body.verifyPassword){
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
              if(err) throw err;
              var query = { _id: req.user.id };
              var reset = { $set: {password: hash} };
              User.findOneAndUpdate( query, reset, {new: true})
                  .then(user => res.json({msg: 'Password Updated Successfully!' }));
            })
          })
        }else{
          return res.status(400).json({msg: "Passwords Don't Match"});
        }
      });
});

module.exports = router;
