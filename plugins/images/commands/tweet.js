exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])
  Mike.models.apibadosz({
    object: message,
    endpoint: `tweet?text=${encodeURIComponent(args.slice(0).join(' '))}&username=${encodeURIComponent(message.author.username)}&url=${encodeURIComponent(message.author.displayAvatarURL)}`
  })
}

exports.data = {
    triggers: ['tweet'],
    description: 'Generates tweet image.',
    usage: [
      '{prefix}{command} <text>',
    ],
    args: [
      {
        type:'text',
        name:'text'
      }
    ]
}
