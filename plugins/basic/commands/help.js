exports.output = async ({message, args, dbGuild}) => {
  const plugin = Mike.plugins.find(plugin => plugin.id == (args[0] ? args[0].toLowerCase() : '*'))
  if (plugin && !(plugin.devOnly && !Mike.roles.developers.includes(message.author.id))) {
    let commands = {
      normal:   [],
      voters:   [],
      donators: []
    }
    for (const command of plugin.commands) {
      if (command.data.voter) {
        commands.voters.push(`\`${command.data.triggers[0]}\``)
      } else if (command.data.donator) {
        commands.donators.push(`\`${command.data.triggers[0]}\``)
      } else {
        commands.normal.push(`\`${command.data.triggers[0]}\``)
      }
    }
    if (plugin.id == 'nsfw' && !message.channel.nsfw) {
      return Mike.models.snap({
        object: message,
        message: `This command is available only on nsfw channels.`,
        color: '#f44262',
        image: Mike.gifs.nsfw
      })
    }
    return Mike.models.snap({
      object: message,
      message: `**${plugin.name}**

                Description: \`${plugin.description}\`
                Author: \`${await Mike.users.get(plugin.author).tag}\`

                Commands:
                ${commands.normal.join(', ')}

                ${commands.voters.length > 0 ? `[Voters](${Mike.links.vote}) commands:\n` + commands.voters.join(', ') : ``}

                ${commands.donators.length > 0 ? `Donators commands:\n` + commands.donators.join(', ') : ``}
                `,
    })
  }
  let command
  if (args[0]) {
    await Mike.plugins.forEach(plugin => {
      const commandMatch = plugin.commands.find(cmd =>
        cmd.data.triggers && cmd.data.triggers.includes(args[0].toLowerCase())
      )
      if (commandMatch !== undefined && !dbGuild.settings.disabledPlugins.includes(plugin.id)) {
        command = commandMatch
      }
    })
    if (command) {
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

      if (command.data.nsfw && !message.channel.nsfw) {
        return Mike.models.snap({
          object: message,
          message: `This command is available only on nsfw channels.`,
          color: '#f44262',
          image: Mike.gifs.nsfw
        })
      }

      return Mike.models.snap({
        object: message,
        message: `**${command.data.triggers[0]}**

                  Triggers: \`${command.data.triggers.join(', ')}\`
                  Description: \`${command.data.description}\`

                  Usage:\`\u200B
                  ${command.data.usage.join('\n')
                                      .replace(/{prefix}/g, Mike.prefix)
                                      .replace(/{command}/g, command.data.triggers[0])}\``,
      })

    }
  }



  let help = `Available Plugins:\n\n`
  await Mike.plugins.forEach(plugin => {
    if (!(plugin.devOnly && !Mike.roles.developers.includes(message.author.id)) && !dbGuild.settings.disabledPlugins.includes(plugin.id) && !plugin.hiddenInHelp) {
      help += `**${plugin.name}** (ID: *${plugin.id}*)\n`
    }
  })
  help += `\nType \`${Mike.prefix}settings\` to configure plugins.`
  help += `\n\n[:globe_with_meridians:](${Mike.links.website}) | [${Mike.customEmojis.patreon}](${Mike.links.patreon}) | [${Mike.customEmojis.github}](${Mike.links.github}) | [${Mike.customEmojis.trello}](${Mike.links.trello})`
  Mike.models.snap({
    object: message,
    message: help,
  })
}

exports.data = {
    triggers: ['help'],
    description: 'Shows help message.',
}
