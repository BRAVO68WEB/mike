exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])
  Mike.models.apibadosz({
    object: message,
    title: ':gun:',
    endpoint: `wanted?url=${user.displayAvatarURL}`
  })
}

exports.data = {
    triggers: ['wanted'],
    description: 'Generates wanted image.',
    usage: [
      '{prefix}{command} [mention]',
      '{prefix}{command} [id]',
      '{prefix}{command} [name]'
    ]
}
