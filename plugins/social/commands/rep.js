exports.output = async ({message, args}) => {
  const xuser = await Mike.utils.users.search(message, args[0])
  if (xuser.bot) {
    return Mike.models.snap({
      object: message,
      message: '\`Bots don\'t have reputation!\`',
      color: '#f44262'
    })
  }
  if(xuser.id == message.author.id) {
    return Mike.models.snap({
      object: message,
      message: '\`You cannot give yourself reputation.\`',
      color: '#f44262'
    })
  }
  const user = await Mike.db.getUser(message.author.id)
  const lastrep = user.lastrep ? user.lastrep : 0
  if (lastrep < Math.trunc(Date.now() - 86400000)) {
    await Mike.db.update('users', message.author.id, 'lastrep', Math.trunc(Date.now()))
    await Mike.db.addRep(xuser.id, 1)
    return Mike.models.snap({
      object: message,
      message: `\`${xuser.tag} recived reputation!\``
    })
  } else {
      const left = Math.abs((Date.now() - 86400000 - lastrep) / 1000)
      return Mike.models.snap({
        object: message,
        message: `\`You can't give reputation right now!\nYou can do this in ${Math.trunc(left / 60 / 60 % 24)} hours, ${Math.trunc(left / 60 % 60)} minutes and ${Math.trunc(left % 60)} seconds.\``,
        color: '#f44262'
      })
  }
}
exports.data = {
  triggers: ['rep'],
  description: 'Give someone rep points.',
  usage: [
    '{prefix}{command} [mention]',
    '{prefix}{command} [id]',
    '{prefix}{command} [name]'
  ],
  args: [
    {
      'type':'user',
      'name':'user'
    }
  ]
}
