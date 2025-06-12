const { REST, Routes, Client, GatewayIntentBits, Partials, Events } = require('discord.js');
const connectToDatabase = require('../database');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Channel],
});
client.commands = new Map();

client.once(Events.ClientReady, async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  // Load commands
  const commands = [];
  const commandsPath = path.join(__dirname, '../commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    if (command.data) {
      commands.push(command.data.toJSON());
      client.commands.set(command.data.name, command);
    } else {
      console.warn(`⚠️ Skipped invalid command file: ${file}`);
    }
  }

  // Deploy commands to test guild
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  const clientId = process.env.CLIENT_ID;
  const guildId = process.env.TEST_GUILD_ID;

  try {
    console.log('🔁 Deploying commands to test guild...');
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
    console.log('✅ Commands deployed successfully.');
  } catch (err) {
    console.error('❌ Failed to deploy commands:', err);
  }
});

// Handle interactions
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

// Connect to DB and login
connectToDatabase().then(() => {
  const token = process.env.DISCORD_TOKEN;
  if (!token) {
    console.error('❌ DISCORD_TOKEN is missing!');
    process.exit(1);
  }
  client.login(token);
});