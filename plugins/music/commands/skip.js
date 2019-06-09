exports.output = async ({message}) => {
  const player = Mike.player.get(message.guild.id)
  if (!player || !player.playing) {
    return Mike.models.snap({
      object: message,
      message: '\`Music isn\'t playing!\`',
      color: '#f44262'
    })
  }
  if(!Mike.queue[message.guild.id]) new Mike.music.queue(message.guild.id)
  let queue = Mike.queue[message.guild.id]
  queue.loop = false
  await player.stop()
  return Mike.models.snap({
    object: message,
    message: '\`Skipped.\`',
  })
};

exports.data = {
  triggers: ['skip','s'],
  description: 'Skips current track.',
  voice: true,
}
