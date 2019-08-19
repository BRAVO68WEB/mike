exports.output = async ({message}) => {

  function byStatus(message, status) {
    return message.guild.members.filter(m => m.presence.status == status && !m.user.bot).size
  }

  const total = message.guild.members.filter(m => !m.user.bot).size

  const msg = `**Members (${total})**
  ${Mike.customEmojis.statusOnline} \`${Math.floor(byStatus(message, 'online')/total*100)}%\` [ ${byStatus(message, 'online')} ] Online
  ${Mike.customEmojis.statusIdle} \`${Math.floor(byStatus(message, 'idle')/total*100)}%\` [ ${byStatus(message, 'idle')} ] Idle
  ${Mike.customEmojis.statusDnd} \`${Math.floor(byStatus(message, 'dnd')/total*100)}%\` [ ${byStatus(message, 'dnd')} ] Dnd
  ${Mike.customEmojis.statusOffline} \`${Math.floor(byStatus(message, 'offline')/total*100)}%\` [ ${byStatus(message, 'offline')} ] Offline

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
