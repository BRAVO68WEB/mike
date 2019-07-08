exports.output = async ({message, args}) => {
  await message.channel.setNSFW(true)
  Mike.models.snap({
    object: message,
    message: `:lock:\`This channel is now NSFW.\``,
  })

}
exports.data = {
  triggers: ['makensfw'],
  description: 'Changes channel settings to NSFW.',
  usage: [
      '{prefix}{command}',
  ],
  userPerms: [
    "MANAGE_GUILD",
    "MANAGE_CHANNELS"
  ],
  botPerms: [
    "MANAGE_CHANNELS"
  ]

}
