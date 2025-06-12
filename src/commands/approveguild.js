const { SlashCommandBuilder } = require('discord.js');
const ApprovedGuild = require('../models/ApprovedGuild');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('approveguild')
    .setDescription('افزودن این سرور به لیست مجاز استفاده از ربات'),

  async execute(interaction) {
    const guildId = interaction.guildId;

    // فقط کاربر مالک ربات اجازه دارد
    const ownerId = process.env.BOT_OWNER_ID;
    if (interaction.user.id !== ownerId) {
      return interaction.reply({ content: '❌ شما مجاز به اجرای این دستور نیستید.', ephemeral: true });
    }

    try {
      await ApprovedGuild.updateOne(
        { guildId },
        { $set: { guildId } },
        { upsert: true }
      );
      interaction.reply({ content: '✅ این سرور اکنون مجاز به استفاده از ربات است.', ephemeral: true });
    } catch (err) {
      console.error(err);
      interaction.reply({ content: '❌ خطا در افزودن سرور.', ephemeral: true });
    }
  }
};
