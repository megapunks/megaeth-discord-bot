const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('request-access')
    .setDescription('Request permission to use this bot on your server.'),
  async execute(interaction) {
    const owner = '1382438594647429283'; // Bot admin user ID
    const requestInfo = `
🔔 New Access Request:
Server: ${interaction.guild.name}
Server ID: ${interaction.guild.id}
Requested by: ${interaction.user.tag} (${interaction.user.id})
`;

    try {
      const user = await interaction.client.users.fetch(owner);
      await user.send(requestInfo);
      await interaction.reply({ content: '✅ Your request has been sent to the bot admin.', ephemeral: true });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: '❌ Failed to send your request. Please try again later.', ephemeral: true });
    }
  }
};