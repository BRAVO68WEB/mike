exports.output = async ({message, args}) => {
  args = args.join(' ')
  if (!args.includes(",")) {
    return Mike.models.snap({
      object: message,
      message: `\`Please include more items.\``,
      color: '#f44262'
    })
  }
  args = args.split(",")
  return Mike.models.snap({
    object: message,
    message: `\`${await Mike.utils.array.single(args)}\``
  })
}

exports.data = {
  triggers: ['choose'],
  description: 'Chooses random item.',
  usage: [
    '{prefix}{command} <item>, <item>, [item]....',
  ],
  args: [
    {
      type:'text',
      name:'items'
    }
  ]
}
