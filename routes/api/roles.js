const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
require('dotenv').config();

// Roles Model
const Roles=require('../../models/Roles');


// @route GET api/roles
// @desc Get all roles
// @access Private
router.get('/',auth,(req,res)=>{
  Roles.find()
    .sort({ date: -1 })
    .then(roles=> res.json(roles))
});

// @route POST api/roles
// @desc Create a role
// @access Private
router.post('/',auth,(req,res)=>{
  const newRole=new Roles({
    name: req.body.name,
    primaryCategory: req.body.primaryCategory,
    subCategory: req.body.subCategory,
    deletePermission: req.body.deletePermission,
    statusPermission: req.body.statusPermission,
    minVotes: req.body.minVotes,
    minDays: req.body.minDays,
    pushComplain: req.body.pushComplain,
  });

  newRole.save()
    .then(role=>{
      return res.json(role);
    });
});

module.exports=router;