

exports.output = async ({message, args}) => {
  const guild = await Mike.guilds.get('473959011557965835')
  emojis = guild.emojis.map(e => `<:${e.name}:${e.id}> | \`<:${e.name}:${e.id}>\` | **${e.name}** `)
  message.channel.send(emojis)
  message.delete()
}


exports.data = {
  triggers: ['mikemoji'],
  description: 'Reload plugins.',
  developer: true,
}
