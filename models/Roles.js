const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// Create Schema
const RolesSchema=new Schema({
  name:{
    type:String,
    required: true
  },
  primaryCategories:{
    type: [String],
    required: true
  },
  subCategories:{
    type: [String],
    required: true
  },
  deletePermission:{
    type: Boolean,
    default: false
  },
  statusPermission:{
    type: Boolean,
    default: false
  },
  minVotes:{
    type: Number,
    required: true
  },
  minDays:{
    type: Number,
    required: true
  },
  pushComplain:{
    type: [String],
    required: true
  }
});

module.exports=Complain =mongoose.model('roles',RolesSchema);