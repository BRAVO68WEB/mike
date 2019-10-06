exports.output = async ({message, dbGuild, args}) => {
  if (args.length >= 2) {
    if (args[0] == 'messages') {
      if (args[1] == 'enable' || args[1] == 'disable') {
          dbGuild.plugins.levels.messages = (args[1] == 'enable')
        await Mike.db.update('guilds', message.guild.id, "plugins", dbGuild.plugins)
        return Mike.models.snap({
          object: message,
          message: `\`${args[1] == 'enable'? 'Enable' : 'Disable'}d!\``,
        })
      }
    }
  }

  Mike.models.snap({
    object: message,
    message: `Message: \`${dbGuild.plugins.levels.message}\`
              Display Level Up Messages: \`${dbGuild.plugins.levels.messages ? `Yes` : `No`}\`

              To change display option type:
              \`${Mike.prefix}levels messages <disable/enable>\`
              `,
  })
}

exports.data = {
    triggers: ['levels'],
    description: 'Shows levels settings.',
    usage: [
        '{prefix}{command} [messages] <disable/enable>'
    ],
    userPerms: [
        "MANAGE_GUILD"
    ]
}
