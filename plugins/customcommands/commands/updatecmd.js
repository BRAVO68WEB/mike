exports.output = async ({message, args}) => {
    const name = args[0]
    const text = args.slice(1).join(' ')

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

    if (await Mike.utils.regex.link(text) && message.guild.members.filter(m => !m.user.bot).size < 300 && !guild.ispremium) {
       return Mike.models.snap({
         object: message,
         message: `Hey! Your text contains link.
                   Only servers with 300+ members (or [[Premium Servers]](https://www.patreon.com/badosz)) can have custom commands with link.

                   [[ask \"why\" here]](${Mike.links.guild}})`,
         color: '#f44262'
       })
    }

    commands = commands.filter(obj => {
        return obj.name !== name
    })

    await commands.push({content: text, name:name})

    guild.plugins.customcmds = commands
    await Mike.db.update('guilds', message.guild.id, 'plugins', guild.plugins)
    return Mike.models.snap({
      object: message,
      message: `\`Updated command.\``,
    })
}
exports.data = {
  triggers: ['updatecmd'],
  description: 'Updates custom command for server .',
  usage: [
    '{prefix}{command} <name> <text>'
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
