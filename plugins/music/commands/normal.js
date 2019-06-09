
exports.output = async ({message}) => {
  const player = Mike.player.get(message.guild.id);
  if (!player) {
    return Mike.models.snap({
      object: message,
      message: '\`Music isn\'t playing!\`',
      color: '#f44262'
    })
  }
  await player.volume(100)
  await player.setEQ([
    {"band": 0, "gain": 0},
    {"band": 1, "gain": 0},
    {"band": 2, "gain": 0},
    {"band": 3, "gain": 0},
    {"band": 4, "gain": 0},
    {"band": 5, "gain": 0},
    {"band": 6, "gain": 0},
    {"band": 7, "gain": 0},
    {"band": 8, "gain": 0},
    {"band": 9, "gain": 0},

  ])
  return Mike.models.snap({
    object: message,
    message: '\`Music is now in normal mode!\`',
  })
};

exports.data = {
  triggers: ['normal'],
  description: 'Returns music to normal mode.',
  voice: true
}
