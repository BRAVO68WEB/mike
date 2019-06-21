exports.output = async ({message, args}) => {
  const player = Mike.player.get(message.guild.id)
  if (!player) {
    return Mike.models.snap({
      object: message,
      message: '\`Music isn\'t playing!\`',
      color: '#f44262'
    })
  }

  await player.seek(parseInt(await Mike.utils.time.toseconds(args[0]))*1000)
  return Mike.models.snap({
    object: message,
    message: '\`Done!\`',
  })
}

exports.data = {
  triggers: ['goto','seek'],
  description: 'Goes to given time.',
  voice: true,
  usage: [
    '{prefix}{command} <S>',
    '{prefix}{command} <M:S>',
    '{prefix}{command} <H:M:S>',
  ],
  args: [
    {
      'type':'text',
      'name':'time'
    }
  ],
  voter: true
}
