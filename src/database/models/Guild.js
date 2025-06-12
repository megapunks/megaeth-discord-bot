const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  settings: {
    nftCollections: [{ contract: String, name: String }],
    roleRules: [{ roleId: String, requiredNft: String }]
  }
});

const Guild = mongoose.model('Guild', guildSchema);

module.exports = Guild;
