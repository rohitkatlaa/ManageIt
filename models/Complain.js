const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// Create Schema
const ComplainSchema=new Schema({
  name:{
    type:String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  imageData: {
    type: String,
    required: false
  }
});

module.exports=Complain =mongoose.model('complain',ComplainSchema);