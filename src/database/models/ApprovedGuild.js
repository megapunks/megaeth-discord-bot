const mongoose = require('mongoose');

const approvedGuildSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ApprovedGuild', approvedGuildSchema);