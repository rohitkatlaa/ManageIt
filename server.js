const express=require('express');
const mongoose=require('mongoose');
const path = require('path');
require('dotenv').config();



const app=express();

// BodyParser middleware
app.use(express.json({limit: '50mb'}));

// DB Config
const db=process.env.MONGOURI

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
app.use('/api/roles',require('./routes/api/roles'));
app.use('/api/reset', require('./routes/api/reset'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server started on port ${port}`));

