exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])
  Mike.models.apibadosz({
    object: message,
    title: `${message.author.username} has patted ${user.username}!`,
    endpoint: `pat`
  })
}

exports.data = {
    triggers: ['pat'],
    description: 'Pats someone.',
    usage: [
      '{prefix}{command} [mention]',
      '{prefix}{command} [id]',
      '{prefix}{command} [name]'
    ]
}
