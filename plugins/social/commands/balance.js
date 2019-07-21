exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    if (user.bot) {
      return Mike.models.snap({
        object: message,
        message: '\`Bots don\'t have money!\`',
        color: '#f44262'
      })
    }
    const userDB = await Mike.db.getUser(user.id)
    Mike.models.snap({
      object: message,
      message: `Bank: \`${userDB.money}\`$
                Pocket: \`${userDB.pocket}\`$

                **Total:** \`${userDB.money + userDB.pocket}\`$
                `,
    })
}
exports.data = {
  triggers: ['balance','money','bal','cash'],
  description: 'Shows user balance.',
  usage: [
    '{prefix}{command} [mention]',
    '{prefix}{command} [id]',
    '{prefix}{command} [name]'
  ]
}
