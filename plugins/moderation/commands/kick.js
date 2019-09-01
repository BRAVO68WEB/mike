exports.output = async ({message, args}) => {
  const mention = message.mentions.members.first()
  if (!mention.bannable) {
    return Mike.models.snap({
      object: message,
      message: `\`You can not kick ${mention.user.tag}.\``,
      color: '#f44262'
    })
  }
    const reason = args.slice(1).join(' ')
    try {
        if (reason) {
            Mike.models.snap({
              object: message,
              message: `**Reason: ** ${reason}`,
              author: [`${mention.user.tag} has been kicked.`, mention.user.displayAvatarURL],
            })
            return mention.kick(reason)
        }
        Mike.models.snap({
          object: message,
          message: ``,
          author: [`${mention.user.tag} has been kicked.`, mention.user.displayAvatarURL],
        })
        return mention.kick()
    } catch (error) {
        return Mike.models.snap({
          object: message,
          message: `\`I can not kick this user.\``,
          color: '#f44262'
        })
    }
}
exports.data = {
  triggers: ['kick','k'],
  description: 'Kick user.',
  usage: [
    '{prefix}{command} <mention> [reason]'
  ],
  args: [
    {
      'type':'mention',
      'name':'user'
    },
  ],
  userPerms: [
    "KICK_MEMBERS"
  ],
  botPerms: [
    "KICK_MEMBERS"
  ]
}
