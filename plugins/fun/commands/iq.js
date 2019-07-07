exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])
  Mike.models.snap({
    object: message,
    message: `${user.username} have ${await Mike.utils.users.tonum(user.tag)} iq`
  })
}

exports.data = {
    triggers: ['iq'],
    description: 'None',
    usage: [
      '{prefix}{command} [mention]',
      '{prefix}{command} [id]',
      '{prefix}{command} [name]'
    ]
}
