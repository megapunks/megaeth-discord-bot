const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-verify-channel')
    .setDescription('ارسال پیام احراز هویت در این چنل')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🛡️ احراز هویت MegaBot')
      .setDescription('برای دسترسی به رول هولدر، روی دکمه زیر کلیک کنید و مراحل احراز هویت را انجام دهید.\n\n[🌐 لینک احراز](https://megapunks.org/megabot/verify)')
      .setColor(0x00ff99);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('✅ Verify')
        .setStyle(ButtonStyle.Link)
        .setURL('https://megapunks.org/megabot/verify')
    );

    await interaction.reply({ content: '✅ پیام احراز هویت ارسال شد.', ephemeral: true });
    await interaction.channel.send({ embeds: [embed], components: [row] });
  }
};
