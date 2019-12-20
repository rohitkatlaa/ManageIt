const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const config = require('config');
const Pusher = require('pusher');

var pusher = new Pusher({
  appId: config.pusherAppId,
  key: config.pusherKey,
  secret: config.pusherSecret,
  cluster: config.pusherCluster,
  encrypted: true,
  disableStats: true
});

// Complain Model
const Complain=require('../../models/Complain');

// User Model
const User=require('../../models/User')

// @route GET api/complains
// @desc Get all complains
// @access Public
router.get('/',(req,res)=>{
  Complain.find()
    .sort({ date: -1 })
    .then(complains=> res.json(complains))
});

// @route POST api/complains
// @desc Create a complain
// @access Private
router.post('/',auth,(req,res)=>{
  const newComplain=new Complain({
    name: req.body.name,
    imageData: req.body.imageData,
  });

  newComplain.save()
    .then(complain=>{
      pusher.trigger('ManageIt','complainUpdate',{
        complains:  complain,
        type: "add"
      })
      return res.json(complain);
    });
});

// @route DELETE api/complains/:id
// @desc Delete a complain
// @access Private
router.delete('/:id',auth,(req,res)=>{
  User.findById(req.user.id)
    .then(user=>{
      if(user.userType==='staff'){
      Complain.findById(req.params.id)
        .then(complain => {
          complain.remove().then(()=>{
            pusher.trigger('ManageIt','complainUpdate',{
              complainID: req.params.id,
              type: "delete"
            })
            return res.json({success: true});
          })})
        .catch(err=> res.status(404).json({success: false}));
      }
      else{
        res.json({msg:"Not a official staff member"});
      }
    })
    .catch(err=> res.status(404).json({success: false, error:err}))
});


module.exports=router;