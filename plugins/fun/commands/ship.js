exports.output = async ({message}) => {
  const users = message.mentions.users.map(u => u.username)
  let shippedName = ''
  for (let i = 0; i < users.length; i++) {
    shippedName += `${users[i].substring(0, users[i].length / 2)}`
  }
  Mike.models.snap({
    object: message,
    message: `${users.join(' + ')} = ${shippedName}`,
  })
}
exports.data = {
  triggers: ['ship'],
  description: 'Ships users.',
  usage: [
    '{prefix}{command} <mention> <mention> ...'
  ],
  args: [
    {
        'type':'mentions',
        'name':'users'
    }
  ]
}
