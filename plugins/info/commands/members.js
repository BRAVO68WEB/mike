exports.output = async ({message}) => {
  const msg = `**Members (${message.guild.members.filter(m => !m.user.bot).size})**
  ${Mike.customEmojis.statusOnline} Online - ${message.guild.members.filter(m => m.presence.status == 'online' && !m.user.bot).size} Online
  ${Mike.customEmojis.statusIdle} Idle - ${message.guild.members.filter(m => m.presence.status == 'idle' && !m.user.bot).size} Idle
  ${Mike.customEmojis.statusDnd} Dnd - ${message.guild.members.filter(m => m.presence.status == 'dnd' && !m.user.bot).size} Dnd
  ${Mike.customEmojis.statusOffline} Offline - ${message.guild.members.filter(m => m.presence.status == 'offline' && !m.user.bot).size} Offline

  **Bots (${message.guild.members.filter(m => m.user.bot).size})**
  ${Mike.customEmojis.statusOnline} Online - ${message.guild.members.filter(m => m.presence.status == 'online' && m.user.bot).size} Online
  ${Mike.customEmojis.statusIdle} Idle - ${message.guild.members.filter(m => m.presence.status == 'idle' && m.user.bot).size} Idle
  ${Mike.customEmojis.statusDnd} Dnd - ${message.guild.members.filter(m => m.presence.status == 'dnd' && m.user.bot).size} Dnd
  ${Mike.customEmojis.statusOffline} Offline - ${message.guild.members.filter(m => m.presence.status == 'offline' && m.user.bot).size} Offline


  `
  Mike.models.snap({
    object: message,
    message: msg,
  })
}
exports.data = {
    triggers: ['members', 'bots'],
    description: 'Shows member and bots count in server.'
}
