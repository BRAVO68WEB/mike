exports.output = async ({message}) => {
  const player = Mike.player.get(message.guild.id);
  if (!player) {
    return Mike.models.snap({
      object: message,
      message: '\`Music isn\'t playing!\`',
      color: '#f44262'
    })
  }
  if(!Mike.queue[message.guild.id]) new Mike.music.queue(message.guild.id)
  let queue = Mike.queue[message.guild.id]
  queue.songs = await Mike.utils.array.shuffle(queue.songs)

  return Mike.models.snap({
    object: message,
    message: '\`Shuffled.\`',
  })
};

exports.data = {
  triggers: ['shuffle'],
  description: 'Shuffles queue.',
  voice: true
}
