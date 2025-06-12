const { SlashCommandBuilder } = require('discord.js');
const ApprovedGuild = require('../models/ApprovedGuild');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('request-access')
    .setDescription('درخواست استفاده از ربات برای سرور شما'),

  async execute(interaction) {
    const guildId = interaction.guild.id;

    let existing = await ApprovedGuild.findOne({ guildId });
    if (existing && existing.status === 'approved') {
      return interaction.reply({ content: '✅ سرور شما قبلاً تایید شده است.', ephemeral: true });
    }

    if (!existing) {
      await ApprovedGuild.create({ guildId });
    }

    await interaction.reply({
      content: '📨 درخواست شما ثبت شد. پس از تأیید، ربات فعال خواهد شد.',
      ephemeral: true
    });
  }
};