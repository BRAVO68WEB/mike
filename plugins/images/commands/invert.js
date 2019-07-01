exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])
  Mike.models.apibadosz({
    object: message,
    title: ':black_joker:',
    endpoint: `invert?url=${user.displayAvatarURL}`
  })
}

exports.data = {
    triggers: ['invert'],
    description: 'Generates invert image.',
    usage: [
      '{prefix}{command} [mention]',
      '{prefix}{command} [id]',
      '{prefix}{command} [name]'
    ]
}
