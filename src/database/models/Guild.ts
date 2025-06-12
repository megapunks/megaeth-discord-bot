import mongoose from 'mongoose';

const guildSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  settings: {
    nftCollections: [{ contract: String, name: String }],
    roleRules: [{ roleId: String, requiredNft: String }]
  }
});

export default mongoose.model('Guild', guildSchema);
