const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// Create Schema
const ComplainSchema=new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  PrimaryCategory: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  roomNum: {
    type: String,
    required: true
  },
  complainDesc: {
    type: String,
  },
  imageData: {
    type: String,
    required: false
  },
  userEmail: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  voteUserId: {
    type: [String],
    required: false
  }
});

module.exports=Complain =mongoose.model('complain',ComplainSchema);