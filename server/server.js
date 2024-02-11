require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.log('Error: ', err));

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

// const bucketListRouter = require('./routes/bucketList');
// app.use('/', bucketListRouter);
const todoRouter = require('./routes/todo');
app.use('/', todoRouter);


app.listen(3333, () => {
  console.log('Server is running on port 3333');
});
