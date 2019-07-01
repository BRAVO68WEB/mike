exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])
  Mike.models.apibadosz({
    object: message,
    title: `${message.author.username} has hugged ${user.username}!`,
    endpoint: `hug`
  })
}

exports.data = {
    triggers: ['hug'],
    description: 'Hugs someone.',
    usage: [
      '{prefix}{command} [mention]',
      '{prefix}{command} [id]',
      '{prefix}{command} [name]'
    ]
}
