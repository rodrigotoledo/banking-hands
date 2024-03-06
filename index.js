const express = require('express');
const mongoose = require('mongoose');
const transactionsRouter = require('./routes/transactions');
const userRouter = require('./routes/users');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/banking-hands').then(() => {
  console.log('Connected')
}).catch((err) => {
  console.error('Error connecting to Mongoose:', err.mongoose);
});

// middlewares
app.use(express.json());

// routes

app.use('/api', transactionsRouter);
app.use('/api', userRouter);

// server

app.listen(PORT, (req, res) => {
  console.log('listening on port 3000')
})