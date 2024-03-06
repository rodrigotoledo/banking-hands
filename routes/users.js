const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// list users

router.get('/users', async (req, res) => {
  try {
  const users = await User.find();
  res.json(users);
  }catch(err){
    res.status(500).json({error: err.message});
  }
});

// create User
router.post('/users', async (req, res) => {
  try {
    const { name, accountNumber} = req.body;
    const user = new User({name, accountNumber});
    await user.save();
    res.status(201).json({message: 'User created successfully', user})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
});

// update user

router.put('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const {name, accountNumber, balance} = req.body;

    const user = await User.findById(userId);
    if(!user) {
      res.status(404).json({error: 'User not found'})
    }
    
    user.name = name
    user.accountNumber = accountNumber;
    user.balance += balance;

    await user.save();

    res.json({message: 'Update user:', user})
  }catch(error) {
    res.status(500).send({error: error.message});
  }
})

// transactons history

router.get('/users/:userId/transactions', async (req, res) => {
  try {
      const transactions = await Transaction.find({receiver: req.params.userId})
        .populate('sender')
        .populate('receiver');
      res.json(transactions)
  } catch(error) {
    res.status(500).json({error: error.message});
  }
})


module.exports = router;