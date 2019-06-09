exports.output = async ({message}) => {
  const player = Mike.player.get(message.guild.id)
  if (!player) {
    return Mike.models.snap({
      object: message,
      message: '\`Music isn\'t playing!\`',
      color: '#f44262'
    })
  }
  await player.volume(1e6)
  return Mike.models.snap({
    object: message,
    message: '\`Volume changed to earrape.\`',
  })
};

exports.data = {
  triggers: ['earrape'],
  description: 'Changes volume of current track to earrape.',
  voice: true,
  voter: true
}
