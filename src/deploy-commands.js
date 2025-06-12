const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, './commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.data) commands.push(command.data);
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// جایگزین با آی‌دی خودت:
const clientId = 'YOUR_CLIENT_ID';
const guildId = 'YOUR_GUILD_ID';

(async () => {
  try {
    console.log('🔁 Refreshing application (/) commands...');
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );
    console.log('✅ Successfully reloaded commands.');
  } catch (error) {
    console.error('❌ Failed to deploy commands:', error);
  }
})();
