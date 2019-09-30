exports.output = async ({message, args}) => {
  
  const player = Mike.player.get(message.guild.id)
  if (!player) {
    return Mike.models.snap({
      object: message,
      message: '\`Music isn\'t playing!\`',
      color: '#f44262'
    })
  }
  
  if(args[0] > 200 || args[0] < 0) {
      return Mike.models.snap({
        object: message,
        message: '\`Provide a number bewteen 1 - 200.\`',
        color: '#f44262'
      })
  }

  await player.volume(args[0])
  
  return Mike.models.snap({
    object: message,
    message: `**Volume:**\n${`[▬](${Mike.links.website})`.repeat(Math.round(player.state.volume/20))}${`▬`.repeat(10-Math.round(player.state.volume/20))} \`${player.state.volume}%\``,
  })
}

exports.data = {
  triggers: ['volume','v', 'vol'],
  description: 'Changes volume of current track.',
  voice: true,
  usage: [
    '{prefix}{command} <volume>'
  ],
  args: [
    {
      'type':'number',
      'name':'volume'
    }
  ],
  voter: true
}
