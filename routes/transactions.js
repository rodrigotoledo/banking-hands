const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Visualizem o saldo das contas

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

module.exports = router;