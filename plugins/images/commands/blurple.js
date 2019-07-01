exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])
  Mike.models.apibadosz({
    object: message,
    title: ':blue_heart:',
    endpoint: `blurple?url=${user.displayAvatarURL}`
  })
}

exports.data = {
    triggers: ['blurple'],
    description: 'Generates blurple image.',
    usage: [
      '{prefix}{command} [mention]',
      '{prefix}{command} [id]',
      '{prefix}{command} [name]'
    ]
}
