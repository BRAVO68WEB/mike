module.exports = async (message, messagePrefix, dbGuild) => {
  let [commandName, ...args] = message.content.slice(messagePrefix.length).split(/ +/g)

  let command
  await Mike.plugins.forEach(plugin => {
    const commandMatch = plugin.commands.find(cmd =>
      cmd.data.triggers && cmd.data.triggers.includes(commandName.toLowerCase())
    )
    if (commandMatch !== undefined && !dbGuild.settings.disabledPlugins.includes(plugin.id)) {
      command = commandMatch
    }

  })

  if(!command) return
  if (!Mike.roles.developers.includes(message.author.id) && command.data.developer) {
    return Mike.models.snap({
      object: message,
      message: '\`This command is for developers only.\`',
      color: '#f44262'
    })
  }
  if (await require('../args')(args, command, message)) return

  command.data = await Object.assign({
      voter: false,
      voice: false,
      cooldown: 1,
      usage: ['{prefix}{command}'],
      developer: false,
      args: [],
      nsfw: false,
      userPerms: [],
      botPerms: []
  }, command.data)

  command.output({
      command: command,
      message: message,
      args: args,
      dbGuild: dbGuild
  }).catch(error => {
    return require('../error')(message, error)
  })

}
