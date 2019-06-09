exports.output = async ({message, dbGuild}) => {
  Mike.models.snap({
    object: message,
    message: `Custom Prefix in this server: \`${dbGuild.prefix ? dbGuild.prefix : '[not set]'}\`

              Customize your server's prefix [[here]](https://mikebot.xyz/dashboard/${message.guild.id}/plugins/prefix)

              `,
  })
}

exports.data = {
    triggers: ['prefix'],
    description: 'Shows custom prefix.'
}
