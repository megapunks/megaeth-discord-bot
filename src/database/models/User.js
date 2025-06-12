const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  discordId: { type: String, required: true },
  walletAddress: { type: String, required: true },
  guildId: { type: String, required: true },
  lastChecked: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
