import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  discordId: { type: String, required: true },
  walletAddress: { type: String, required: true },
  guildId: { type: String, required: true },
  lastChecked: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
