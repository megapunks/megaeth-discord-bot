// src/commands/ping.js
module.exports = {
  name: 'ping',
  execute(interaction) {
    interaction.reply('Pong!');
  }
};
