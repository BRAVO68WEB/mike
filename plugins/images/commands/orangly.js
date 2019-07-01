exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])
  Mike.models.apibadosz({
    object: message,
    title: ':large_orange_diamond: ',
    endpoint: `orangly?url=${user.displayAvatarURL}`
  })
}

exports.data = {
    triggers: ['orangly'],
    description: 'Generates orangly image.',
    usage: [
      '{prefix}{command} [mention]',
      '{prefix}{command} [id]',
      '{prefix}{command} [name]'
    ]
}
