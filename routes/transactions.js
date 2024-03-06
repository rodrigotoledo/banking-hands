const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Transaction = require('../models/Transaction');

// balance

router.get('/balance/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if(!user) {
      return res.status(404).json({error: 'User not found'});
    }

    res.json({balance: user.balance})

  } catch (err) {
    res.status(500).json({error: err.message});
  }
})

// operations

router.post('/transactions', async (req, res) => {
  try {
    const { senderId, receiverId, amount } = req.body;
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if(!sender || !receiver){
      return res.status(404).json({ error: 'Users Not Found' });
    }

    if(sender.balance < amount){
      return res.status(400).json({ error: 'Without balance' });
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save()
    await receiver.save()

    const transaction = new Transaction({sender: sender, receiver: receiver, amount: amount})
    await transaction.save()

    res.status(201).json({message: 'Transaction saved successfully', transaction: transaction})
  }catch(err) {
    res.status(500).json({error: err.message})
  };
})

module.exports = router;