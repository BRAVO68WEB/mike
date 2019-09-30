exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])
  
  let perc = await Mike.utils.users.tonum(user.tag)
  if (Mike.roles.developers.includes(user.id)) {
    perc = -10
  }

  Mike.models.snap({
    object: message,
    message: `:gay_pride_flag: ${user.tag} is ${perc}% gay.`
  })
}

exports.data = {
  triggers: ['howgay'],
  description: 'Shows gay % of user.',
  usage: [
      '{prefix}{command} [mention]',
      '{prefix}{command} [id]',
      '{prefix}{command} [name]'
  ]
}
