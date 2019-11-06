const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const complain=require('./routes/api/complain');

const app=express();

// BodyParser middleware
app.use(bodyParser.json());

// DB Config

const db=require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db)
  .then(()=> console.log("MongoDb Connected..."))
  .catch(err=> console.log(err));

// use Routes
app.use('/api/complains',complain);


const port =5000;
app.listen(port,()=>console.log(`Server started on port ${port}`));

