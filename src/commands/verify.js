const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Send the verification message to the current channel'),

  async execute(interaction) {
    const verifyUrl = 'https://megapunks.org/megabot/verify';

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Verify Now')
        .setStyle(ButtonStyle.Link)
        .setURL(verifyUrl)
    );

    await interaction.reply({
      content: '✅ Click the button below to verify your wallet and Discord account:',
      components: [row]
    });
  }
};