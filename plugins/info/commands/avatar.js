exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])
  Mike.models.mult({
    object: message,
    description: `${user.tag} (${user.id})`, 
    image: user.displayAvatarURL,
  })
}

exports.data = {
  triggers: ['avatar'],
  description: 'Shows user\'s avatar',
  usage: [
      '{prefix}{command} [mention]',
      '{prefix}{command} [id]',
      '{prefix}{command} [name] '
  ]
}
