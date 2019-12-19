const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// Create Schema
const UserSchema=new Schema({
  name:{
    type:String,
    required: true
  },
  userType:{
    type: String,
    required: true,
    enum: ['student','staff']
  },
  email:{
    type:String,
    required: true,
    unique: true
  },
  password:{
    type:String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports=Complain =mongoose.model('user',UserSchema);