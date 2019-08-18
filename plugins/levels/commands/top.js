exports.output = async ({message}) => {
  return Mike.models.snap({
    object: message,
    message: `To see leaderboards visit this [[website]](https://mikebot.xyz/server/${message.guild.id})`
  })
}
exports.data = {
  triggers: ['top'],
  description: 'Shows top users.'
}
