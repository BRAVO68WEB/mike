exports.output = async ({message, args}) => {
  const user = await Mike.db.getUser(message.author.id)
  if (isNaN(args[0]) || args[0] <= 0) {
    return Mike.models.snap({
      object: message,
      message: '\`Provide valid amount of bank money.\`',
      color: '#f44262'
    })
  }
  if (parseInt(args[0]) > user.money) {
    return Mike.models.snap({
      object: message,
      message: '\`You don\'t have so much bank money.\`',
      color: '#f44262'
    })
  }
  await Mike.db.transferPocket(message.author.id, parseInt(args[0]))
  Mike.models.snap({
    object: message,
    message: `Withdrawn \`${args[0]}$\` to pocket.`,
  })
}
exports.data = {
  triggers: ['withdraw'],
  description: 'Withdraws bank money to pocket.',
  usage: [
    '{prefix}{command} <money>',
  ],
  args: [
    {
      'type':'money',
      'name':'money'
    }
  ]
}
