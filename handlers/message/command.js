module.exports = async (message, messagePrefix, dbGuild) => {
  let [commandName, ...args] = message.content.slice(messagePrefix.length).split(/ +/g)

  let command
  await Mike.plugins.forEach(plugin => {
    const commandMatch = plugin.commands.find(cmd =>
      cmd.data.triggers && cmd.data.triggers.includes(commandName.toLowerCase())
    )
    if (commandMatch !== undefined) {
      command = commandMatch
    }

  })

  if(!command) return

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
  })
  // args = await require('../args')(args, message)
}
