exports.output = async ({message}) => {
  const invite = await message.channel.createInvite()
  return Mike.models.snap({
    object: message,
    message: `https://discord.gg/${invite.code}`
  })
}
exports.data = {
  triggers: ['generateinvite'],
  description: 'Generates invite for current text channel.',
  userPerms: [
    'CREATE_INSTANT_INVITE'
  ],
  botPerms: [
    'CREATE_INSTANT_INVITE'
  ]
}
