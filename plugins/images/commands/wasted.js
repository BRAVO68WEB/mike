exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])
  Mike.models.apibadosz({
    object: message,
    title: ':gun:',
    endpoint: `wasted?url=${user.displayAvatarURL}`
  })
}

exports.data = {
    triggers: ['wasted'],
    description: 'Generates wasted image.',
    usage: [
      '{prefix}{command} [mention]',
      '{prefix}{command} [id]',
      '{prefix}{command} [name]'
    ]
}
