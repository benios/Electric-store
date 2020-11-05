const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  userName: String,
  password: String,
  firstName: String,
  lastName: String,
  address: String,
  age: Number,
  role: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
