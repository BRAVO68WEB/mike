exports.output = async ({message, args}) => {
  const player = Mike.player.get(message.guild.id)
  if (!player) {
    return Mike.models.snap({
      object: message,
      message: '\`Music isn\'t playing!\`',
      color: '#f44262'
    })
  }

  if (args[0] == 'low') {
    await player.setEQ([
      {"band": 0, "gain": 2},
      {"band": 1, "gain": 4},
      {"band": 2, "gain": -4},
      {"band": 3, "gain": -2},
    ])
  } else if (args[0] == 'medium') {
    await player.setEQ([
      {"band": 0, "gain": 3},
      {"band": 1, "gain": 6},
      {"band": 2, "gain": -6},
      {"band": 3, "gain": -3},
    ])
  } else if (args[0] == 'hard') {
    await player.setEQ([
      {"band": 0, "gain": 4},
      {"band": 1, "gain": 8},
      {"band": 2, "gain": -8},
      {"band": 3, "gain": -4},
    ])
  } else {
    await player.setEQ([
      {"band": 0, "gain": 3},
      {"band": 1, "gain": 6},
      {"band": 2, "gain": -6},
      {"band": 3, "gain": -3},
    ])
  }

  return Mike.models.snap({
    object: message,
    message: '\`Music is now bass boosted.\`'
  })
}

exports.data = {
  triggers: ['bassboost'],
  description: 'Makes bassboost filter on.',
  voice: true,
  usage: [
      '{prefix}{command} [low/medium/hard]',
  ],
  voter: true
}
