exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    if (isNaN(args[1]) || args[1] <= 0) {
      return Mike.models.snap({
        object: message,
        message: '\`Provide valid amount of pocket money.\`',
        color: '#f44262'
      })
    }
    const userDB = await Mike.db.getUser(message.author.id)
    if (parseInt(args[1]) > userDB.pocket) {
      return Mike.models.snap({
        object: message,
        message: '\`You don\'t have so much pocket money.\`',
        color: '#f44262'
      })
    }
    if(user.bot) {
      return Mike.models.snap({
        object: message,
        message: '\`Bots don\'t have pockets!\`',
        color: '#f44262'
      })
    }
    if(user.id == message.author.id) {
      return Mike.models.snap({
        object: message,
        message: '\`You cannot give yourself money.\`',
        color: '#f44262'
      })
    }
    await Mike.db.getUser(user.id)
    await Mike.db.addMoney(user.id, parseInt(args[1]))
    await Mike.db.subMoney(message.author.id, parseInt(args[1]))
    return Mike.models.snap({
      object: message,
      message: `\`Sent ${args[1]}$ to ${user.tag}\``
    })

}
exports.data = {
  triggers: ['pay','share'],
  description: 'Pay someone.',
  usage: [
      '{prefix}{command} [mention] <money>',
      '{prefix}{command} [id] <money>',
      '{prefix}{command} [name] <money>'
  ],
  args: [
    {
        'type':'user',
        'name':'user'
    },
    {
        'type':'money',
        'name':'money'
    }
  ]
}
