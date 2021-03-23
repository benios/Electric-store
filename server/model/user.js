const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  userName: { type: String, index: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  source: { type: String },
  sourceId: { type: String },
  role: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
