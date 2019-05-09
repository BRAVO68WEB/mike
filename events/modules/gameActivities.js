module.exports = (oldMember, newMember) => {
  if (oldMember.user.bot || newMember.user.bot) return;
  if (newMember.user.presence.status === 'offline') return;
  if (!newMember.user.presence.game) return;
  if (newMember.user.presence.game.type !== 0) return;
  if (!newMember.user.presence.game.applicationID) return;
  if (!('activities' in newMember.guild)) newMember.guild.activities = {};
  if (!('games' in newMember.guild.activities)) newMember.guild.activities.games = {};
  if (!(newMember.user.presence.game.name in newMember.guild.activities.games)) newMember.guild.activities.games[newMember.user.presence.game.name] = [];
  if (newMember.guild.activities.games[newMember.user.presence.game.name].includes(newMember.id)) return;
  newMember.guild.activities.games[newMember.user.presence.game.name].push(newMember.id);
};
