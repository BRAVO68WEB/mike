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

  command.data = await Object.assign({
      voter: false,
      donator: false,
      voice: false,
      cooldown: 1,
      usage: ['{prefix}{command}'],
      developer: false,
      args: [],
      nsfw: false,
      userPerms: [],
      botPerms: []
  }, command.data)

  if (!Mike.roles.developers.includes(message.author.id) && command.data.developer) {
    return Mike.models.snap({
      object: message,
      message: '\`This command is for developers only.\`',
      color: '#f44262'
    })
  }
  if (command.data.voice == true && !message.member.voiceChannel) {
    return Mike.models.snap({
      object: message,
      message: '\`Join voice channel first.\`',
      color: '#f44262'
    })
  }

  const userPerms = message.guild.members.get(message.author.id).permissions
  const botPerms = message.guild.members.get(Mike.user.id).permissions

  if (command.data.userPerms.some(perm => !userPerms.has(perm)) && !Mike.roles.developers.includes(message.author.id)) {
    const perm = command.data.userPerms.filter(perm => !userPerms.has(perm))[0]
    return Mike.models.snap({
      object: message,
      message: `You need to have \`${perm.toTitleCase().replace(`_`,` `)}\` permission to use this command.`,
      color: '#f44262',
      image: Mike.gifs[perm]
    })
  }

  if (command.data.botPerms.some(perm => !botPerms.has(perm))) {
    const perm = command.data.botPerms.filter(perm => !botPerms.has(perm))[0]
    return Mike.models.snap({
      object: message,
      message: `${Mike.user.username} doesn't have \`${perm.toTitleCase().replace(`_`,` `)}\` permission.`,
      color: '#f44262',
      image: Mike.gifs[perm]
    })
  }

  if (await require('../args')(args, command, message)) return

  command.output({
      command: command,
      message: message,
      args: args,
      dbGuild: dbGuild
  })
  .catch(error => {
    return require('../error')(message, error)
  })

}
