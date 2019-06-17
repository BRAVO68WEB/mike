exports.output = async ({message, dbGuild, args}) => {
  if (args.length >= 1) {
    await Mike.db.update('guilds', message.guild.id, "prefix", args[0])
    return Mike.models.snap({
      object: message,
      message: `\`Prefix has been changed to ${args[0]}\``,
    })
  }

  Mike.models.snap({
    object: message,
    message: `Custom Prefix in this server: \`${dbGuild.prefix ? dbGuild.prefix : '[not set]'}\`

              To change prefix type: \`${Mike.prefix}prefix <new prefix>\`

              `,
  })
}

exports.data = {
    triggers: ['prefix'],
    description: 'Shows custom prefix.',
    usage: [
        '{prefix}{command} [prefix]',
    ]
}
