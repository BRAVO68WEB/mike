exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])
  Mike.models.apibadosz({
    object: message,
    title: ':angry:',
    endpoint: `triggered?url=${user.displayAvatarURL}`
  })
}

exports.data = {
    triggers: ['triggered'],
    description: 'Generates triggered image.',
    usage: [
      '{prefix}{command} [mention]',
      '{prefix}{command} [id]',
      '{prefix}{command} [name]'
    ]
}
