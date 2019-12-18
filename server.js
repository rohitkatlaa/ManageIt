const express=require('express');
const mongoose=require('mongoose');
const config = require('config');



const app=express();

// BodyParser middleware
app.use(express.json());

// DB Config

const db=config.get('mongoURI');

// Connect to MongoDB
mongoose.connect(db,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(()=> console.log("MongoDb Connected..."))
  .catch(err=> console.log(err));

// use Routes
app.use('/api/complains',require('./routes/api/complain'));
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));


const port =5000;
app.listen(port,()=>console.log(`Server started on port ${port}`));

