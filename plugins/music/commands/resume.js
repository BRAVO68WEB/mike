exports.output = async ({message}) => {
  const player = Mike.player.get(message.guild.id)
  if (!player.playing || !player) {
    return Mike.models.snap({
      object: message,
      message: '\`Music isn\'t playing!\`',
      color: '#f44262'
    })
  }
  if(!Mike.queue[message.guild.id]) new Mike.music.queue(message.guild.id)
  let queue = Mike.queue[message.guild.id]
  if(!queue.np.paused) queue.resume()
  await player.pause(false)
  return Mike.models.snap({
    object: message,
    message: '\`Resumed.\`',
  })
};

exports.data = {
  triggers: ['resume'],
  description: 'Resumes current track.',
  voice: true
}
