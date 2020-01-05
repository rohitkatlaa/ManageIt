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

// @route GET api/complains/:id
// @desc Get a particular complaint
// @access Public
router.get('/:id',(req,res)=>{
  Complain.findById(req.params.id)
    .then(complain=> res.json(complain))
});


// @route POST api/complains
// @desc Create a complain
// @access Private
router.post('/',auth,(req,res)=>{
  const newComplain=new Complain({
    imageData: req.body.imageData,
    userEmail: req.body.userEmail,
    PrimaryCategory: req.body.PrimaryCategory,
    subCategory: req.body.subCategory,
    roomNum: req.body.roomNum,
    complainDesc: req.body.complainDesc,
    status: req.body.status
  });

  newComplain.save()
    .then(complain=>{
      pusher.trigger('ManageIt','complainUpdate',{
        complainId:  complain._id,
        type: "add"
      })
      return res.json(complain);
    });
});

// @route POST api/complains/status/:id
// @desc Change status of a complain
// @access Private
router.post('/status/:id',auth,(req,res)=>{
  const filter = { _id: req.params.id };
  const update = { status: req.body.status };
  Complain.findOneAndUpdate(filter,update,{new: true})
    .then(complain=> {
      pusher.trigger('ManageIt','complainUpdate',{
        complain:  complain,
        type: "edit"
      }) 
      return res.json(complain)
    })
});


// @route DELETE api/complains/:id
// @desc Delete a complain
// @access Private
router.delete('/:id',auth,(req,res)=>{
  User.findById(req.user.id)
    .then(user=>{
      Complain.findById(req.params.id)
        .then(complain => {
          if(user.userType==='staff' || user.email===complain.userEmail){
            complain.remove().then(()=>{
            pusher.trigger('ManageIt','complainUpdate',{
              complainID: req.params.id,
              type: "delete"
            })
            return res.json({success: true});
          })}
          else{
            res.json({msg:"Not a official staff member"});
          }
        }
      )
      .catch(err=> res.status(404).json({success: false}));
    })
    .catch(err=> res.status(404).json({success: false, error:err}))
});


module.exports=router;