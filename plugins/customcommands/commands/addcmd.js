exports.output = async ({message, args}) => {
  const name = args[0]
  const text = args.slice(1).join(' ')

  let guild = await Mike.db.getGuild(message.guild.id)
  let commands = guild.plugins.customcmds ? guild.plugins.customcmds : []


  if (commands.length > 14 && !guild.ispremium) {
    return Mike.models.snap({
      object: message,
      message: `\`Your server can't have more then 15 command!\nMore custom commands are avalible for\` [[Premium Servers]](${Mike.links.patreon})\``,
      color: '#f44262'
    })
  }
  const cmd = commands.find(c => c.name === name)
  let command

  await Mike.plugins.forEach(plugin => {
    const commandMatch = plugin.commands.find(cmd =>
      cmd.data.triggers && cmd.data.triggers.includes(args[0].toLowerCase())
    )
    if (commandMatch !== undefined) {
      command = commandMatch
    }
  })

  if (cmd || command) {
    return Mike.models.snap({
      object: message,
      message: `\`Command already exists!\``,
      color: '#f44262'
    })
  }

  if (await Mike.utils.regex.link(text) && message.guild.members.filter(m => !m.user.bot).size < 300 && !guild.ispremium) {
     return Mike.models.snap({
       object: message,
       message: `Hey! Your text contains link.
                 Only servers with 300+ members (or [[Premium Servers]](https://www.patreon.com/badosz)) can have custom commands with link.

                 [[ask \"why\" here]](${Mike.links.guild}})`,
       color: '#f44262'
     })
  }

  await commands.push({content: text, name:name})

  guild.plugins.customcmds = commands

  await Mike.db.update('guilds', message.guild.id, 'plugins', guild.plugins)

  return Mike.models.snap({
    object: message,
    message: `\`Added new command.\``,
  })
}

exports.data = {
  triggers: ['addcmd'],
  description: 'Adds custom command for server.',
  usage: [
    '{prefix}{command} <name> <text>',
    '\n[\`[GUIDE](https://mikebot.xyz/tags)\`]'
  ],
  args: [
    {
      'type':'text',
      'name':'name'
    },
    {
      'type':'text',
      'name':'text'
    }
  ],
  userPerms: [
    "MANAGE_GUILD"
  ]
}
