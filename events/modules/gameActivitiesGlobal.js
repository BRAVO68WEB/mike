module.exports = (oldMember, newMember) => {
  if (oldMember.user.bot || newMember.user.bot) return;
  if (newMember.user.presence.status === 'offline') return;
  if (!newMember.user.presence.game) return;
  if (newMember.user.presence.game.type !== 0) return;
  if (!newMember.user.presence.game.applicationID) return;
  if (!(newMember.user.presence.game.name in Mike.stats.games)) Mike.stats.games[newMember.user.presence.game.name] = [];
  if (Mike.stats.games[newMember.user.presence.game.name].includes(newMember.id)) return;
  Mike.stats.games[newMember.user.presence.game.name].push(newMember.id);
};
