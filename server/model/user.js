const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  userName: { type: String, required: true, index: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  type: { type: String },
  role: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
