exports.output = async ({message, dbGuild, args}) => {
  if (args.length >= 1) {
    if (args[0] == 'enable' || args[0] == 'disable') {
      dbGuild.plugins.autoresponder.enabled = (args[0] == 'enable')
      await Mike.db.update('guilds', message.guild.id, "plugins", dbGuild.plugins)
      return Mike.models.snap({
        object: message,
        message: `\`${args[0] == 'enable'? 'Enable' : 'Disable'}d!\``,
      })
    }
  }

  Mike.models.snap({
    object: message,
    message: `AutoResponder: \`${dbGuild.plugins.autoresponder.enabled ? `Enabled` : `Disabled`}\`

              To change this option type:
              \`${Mike.prefix}autoresponder <disable/enable>\`
              `,
  })
}

exports.data = {
    triggers: ['autoresponder'],
    description: 'Shows autoresponder settings.',
    usage: [
        '{prefix}{command} <disable/enable>'
    ],
    userPerms: [
        "MANAGE_GUILD"
    ]
}
