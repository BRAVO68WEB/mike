exports.output = async ({message, args}) => {
  const name = args[0]
  let guild = await Mike.db.getGuild(message.guild.id)

  let commands = guild.plugins.customcmds ? guild.plugins.customcmds : []
  const cmd = commands.find(c => c.name === name)

  if(!cmd) {
    return Mike.models.snap({
      object: message,
      message: `\`Command doesn't exist!\``,
      color: '#f44262'
    })
  }

  commands = commands.filter(obj => {
      return obj.name !== name
  })

  guild.plugins.customcmds = commands

  await Mike.db.update('guilds', message.guild.id, 'plugins', guild.plugins)

  return Mike.models.snap({
    object: message,
    message: `\`Removed command!\``,
    color: '#f44262'
  })

}
exports.data = {
  triggers: ['delcmd'],
  description: 'Deletes custom command for server.',
  usage: [
      '{prefix}{command} <cmd>'
  ],
  args: [
    {
      'type':'text',
      'name':'command'
    },
  ],
  userPerms: [
    "MANAGE_GUILD"
  ]
}
