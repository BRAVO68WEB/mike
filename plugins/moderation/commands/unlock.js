exports.output = async ({message, args}) => {
  await message.channel.overwritePermissions(message.guild.id, {
     SEND_MESSAGES: null,
     ADD_REACTIONS: null
  })
  Mike.models.snap({
    object: message,
    message: `:lock:\`Channel unlocked.\``,
  })

  message.delete()

}
exports.data = {
  triggers: ['unlock'],
  description: 'Unlocks channel.',
  usage: [
      '{prefix}{command}',
  ],
  userPerms: [
    "MANAGE_GUILD"
  ],
  botPerms: [
    "MANAGE_ROLES",
    "MANAGE_CHANNELS"
  ]

}
