const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  firstName: String,
  lastName: String,
  address: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
