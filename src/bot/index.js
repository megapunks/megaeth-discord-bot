const deployCommands = require('../deploy-commands');
const { Client, GatewayIntentBits, Partials, Events } = require('discord.js');
const connectToDatabase = require('../database');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Channel]
});

client.once(Events.ClientReady, () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.commands = new Map();
const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  if (!command.data || !command.data.name) {
    console.warn(`⚠️ Skipped invalid command file: ${file}`);
    continue;
  }
  client.commands.set(command.data.name, command);
}

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({ content: '❌ Error occurred', ephemeral: true });
  }
});

connectToDatabase().then(() => {
  const token = process.env.DISCORD_TOKEN;
  if (!token) {
    console.error('❌ DISCORD_TOKEN is missing!');
    process.exit(1);
  }

  // Deploy slash commands on startup (guild-scoped)
  deployCommands().then(() => {
    console.log('🚀 Slash commands deployed.');
  });

  client.login(token);
});
