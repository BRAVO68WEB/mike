exports.output = async ({message}) => {

  function byStatus(message, status) {
    return message.guild.members.filter(m => m.presence.status == status && !m.user.bot).size
  }

  function byGame(message, games){
    let total = 0
    games.forEach(game => {
      total += message.guild.members.filter(m => m.presence.game && m.presence.game.name == game && !m.user.bot).size
    })
    return total
  }

  const total = message.guild.members.filter(m => !m.user.bot).size

  const msg = `**Members (${total})**
  ${Mike.customEmojis.statusOnline} \`${Math.floor(byStatus(message, 'online')/total*100)}%\` [ ${byStatus(message, 'online')} ] Online
  ${Mike.customEmojis.statusIdle} \`${Math.floor(byStatus(message, 'idle')/total*100)}%\` [ ${byStatus(message, 'idle')} ] Idle
  ${Mike.customEmojis.statusDnd} \`${Math.floor(byStatus(message, 'dnd')/total*100)}%\` [ ${byStatus(message, 'dnd')} ] Dnd
  ${Mike.customEmojis.statusOffline} \`${Math.floor(byStatus(message, 'offline')/total*100)}%\` [ ${byStatus(message, 'offline')} ] Offline

  :keyboard: \`${Math.floor(byGame(message, ['JetBrains IDE', 'Atom Editor', 'Visual Studio Code'])/total*100)}%\` [ ${byGame(message, ['JetBrains IDE', 'Atom Editor', 'Visual Studio Code'])} ] Programming
  :musical_note: \`${Math.floor(byGame(message, ['Spotify'])/total*100)}%\` [ ${byGame(message, ['Spotify'])} ] Listening to Spotify
  :sleeping_accommodation: \`${Math.floor(message.guild.members.filter(m => !m.presence.game && !m.user.bot).size/total*100)}%\` [ ${message.guild.members.filter(m => !m.presence.game && !m.user.bot).size} ] Doing nothing
  `
  Mike.models.snap({
    object: message,
    message: msg,
  })
  
}
exports.data = {
    triggers: ['members'],
    description: 'Shows member count in server.'
}
