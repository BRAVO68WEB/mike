exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])
  Mike.models.snap({
    object: message,
    message: `${user.username} have ${await Mike.utils.users.tonum(user.tag, 200)} iq.`
  })
}

exports.data = {
    triggers: ['iq'],
    description: 'Shows user\'s iq',
    usage: [
      '{prefix}{command} [mention]',
      '{prefix}{command} [id]',
      '{prefix}{command} [name]'
    ]
}
