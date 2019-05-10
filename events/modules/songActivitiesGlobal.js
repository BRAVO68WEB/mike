module.exports = (oldMember, newMember) => {
  if (oldMember.user.bot || newMember.user.bot) return;
  if (newMember.user.presence.status === 'offline') return;
  if (!newMember.user.presence.game) return;
  if (newMember.user.presence.game.type !== 2 || newMember.user.presence.game.name !== 'Spotify') return;
  let songTitle = `${newMember.user.presence.game.details} by ${newMember.user.presence.game.state}`;
  if (!(songTitle in Mike.stats.songs)) Mike.stats.songs[songTitle] = [];
  if (Mike.stats.songs[songTitle].includes(newMember.id)) return;
  Mike.stats.songs[songTitle].push(newMember.id);
};
