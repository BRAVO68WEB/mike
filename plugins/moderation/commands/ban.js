exports.output = async ({message, args}) => {
  const mention = message.mentions.members.first()
  if (!mention.bannable) {
    return Mike.models.snap({
      object: message,
      message: `\`You can not ban ${mention.user.tag}.\``,
      color: '#f44262'
    })
  }
    const reason = args.slice(1).join(' ')
    try {
        if (reason) {
            Mike.models.snap({
              object: message,
              message: `**Reason: ** ${reason}`,
              author: [`${mention.user.tag} has been banned.`, mention.user.displayAvatarURL],
            })
            return mention.ban(reason)
        }
        Mike.models.snap({
          object: message,
          message: ``,
          author: [`${mention.user.tag} has been banned.`, mention.user.displayAvatarURL],
        })
        return mention.ban()
    } catch (error) {
        return Mike.models.snap({
          object: message,
          message: `\`I can not ban this user.\``,
          color: '#f44262'
        })
    }
}
exports.data = {
  triggers: ['ban','b'],
  description: 'Bans user.',
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
    "BAN_MEMBERS"
  ],
  botPerms: [
    "BAN_MEMBERS"
  ]
}
