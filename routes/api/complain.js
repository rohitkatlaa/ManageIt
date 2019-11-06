const express=require('express');
const router=express.Router();

// Complain Model
const Complain=require('../../models/Complain');

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
// @access Public
router.post('/',(req,res)=>{
  const newComplain=new Complain({
    name: req.body.name
  });

  newComplain.save()
    .then(complain=> res.json(complain));
});

// @route DELETE api/complains/:id
// @desc Delete a complain
// @access Public
router.delete('/:id',(req,res)=>{
  Complain.findById(req.params.id)
    .then(complain => 
      complain.remove().then(()=>res.json({success: true})))
    .catch(err=> res.status(404).json({success: false}));
});


module.exports=router;