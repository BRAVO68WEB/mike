exports.output = async ({message}) => {
  const player = Mike.player.get(message.guild.id)
  if (player) {
      await player.stop()
  }
  if(!Mike.queue[message.guild.id]) new Mike.music.queue(message.guild.id)
  let queue = Mike.queue[message.guild.id]
  queue.songs = []
  queue.loop = false
  queue.repeat = false
  await Mike.player.leave(message.guild.id)
  Mike.models.snap({
    object: message,
    message: `\`Left voice channel.\``
  })
};

exports.data = {
  triggers: ['leave'],
  description: 'Leaves voice channel.',
  voice: true
}
