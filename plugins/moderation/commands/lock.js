exports.output = async ({message, args}) => {
  
  let channel = message.mentions.channels.first()

  if (!channel) {
    channel = message.channel
  }

  const reason = args.join(' ')

  Mike.models.snap({
    object: message,
    message: `:lock:\`Channel locked.\`

              ${reason ? `**Reason:** ${reason}` : ``}
    `,
  })
  await channel.overwritePermissions(message.guild.id, {
     SEND_MESSAGES: false,
     ADD_REACTIONS: false
  })

  message.delete()

}
exports.data = {
  triggers: ['lock','lockdown'],
  description: 'Locks down channel.',
  usage: [
      '{prefix}{command} [reason]',
  ],
  userPerms: [
    "MANAGE_GUILD"
  ],
  botPerms: [
    "MANAGE_ROLES",
    "MANAGE_CHANNELS"
  ]

}
