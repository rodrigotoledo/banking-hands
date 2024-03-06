const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  accountNumber: {type: String, required: true, unique: true},
  balance: {type: Number, default: 0}
})

const User = mongoose.model('User', UserSchema);

module.exports = User;