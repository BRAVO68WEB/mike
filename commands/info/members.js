exports.output = async ({message}) => {
  const msg = `**Members (${message.guild.members.filter(m => !m.user.bot).size})**
  ${Mike.emoji.statusOnline} - ${message.guild.members.filter(m => m.presence.status == 'online' && !m.user.bot).size} Online
  ${Mike.emoji.statusIdle} - ${message.guild.members.filter(m => m.presence.status == 'idle' && !m.user.bot).size} Idle
  ${Mike.emoji.statusDnd} - ${message.guild.members.filter(m => m.presence.status == 'dnd' && !m.user.bot).size} Dnd
  ${Mike.emoji.statusOffline} - ${message.guild.members.filter(m => m.presence.status == 'offline' && !m.user.bot).size} Offline

  **Bots (${message.guild.members.filter(m => m.user.bot).size})**
  ${Mike.emoji.statusOnline} - ${message.guild.members.filter(m => m.presence.status == 'online' && m.user.bot).size} Online
  ${Mike.emoji.statusIdle} - ${message.guild.members.filter(m => m.presence.status == 'idle' && m.user.bot).size} Idle
  ${Mike.emoji.statusDnd} - ${message.guild.members.filter(m => m.presence.status == 'dnd' && m.user.bot).size} Dnd
  ${Mike.emoji.statusOffline} - ${message.guild.members.filter(m => m.presence.status == 'offline' && m.user.bot).size} Offline


  `
  Mike.exec.snap(message,msg, false)
}
exports.data = {
    triggers: ['members', 'bots'],
    description: 'Shows member and bots count in guild.'
}
