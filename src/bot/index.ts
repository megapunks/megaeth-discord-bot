import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { connectToDatabase } from "../database";

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once("ready", () => {
  console.log(`✅ Bot ready as ${client.user?.tag}`);
});

// اتصال همزمان به MongoDB و دیسکورد
(async () => {
  await connectToDatabase();
  await client.login(process.env.DISCORD_TOKEN);
})();
