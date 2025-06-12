const whitelistedGuilds = ['1382713892958109696'];

function isWhitelisted(guildId) {
  return whitelistedGuilds.includes(guildId);
}

module.exports = isWhitelisted;