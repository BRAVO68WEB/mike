exports.output = async ({message, args}) => {
  const mention = message.mentions.members.first()
  if (mention.id == message.author.id) {
    return Mike.models.snap({
      object: message,
      message: `\`You can not warn youself.\``,
      color: '#f44262'
    })
  }
  const dbGuild = await Mike.db.getGuild(message.guild.id, false)
  const reason = args.slice(1).join(' ')
  await Mike.db.addWarn(mention.id, message.guild.id, dbGuild)
  Mike.models.snap({
    object: message,
    message: reason ? `**Reason: **${reason}` : '',
    author: [`${mention.user.tag} has been warned. (${dbGuild.warns[mention.id] ? dbGuild.warns[mention.id].warns + 1 : 1}/3)`, mention.user.displayAvatarURL]
  })

  if (dbGuild.warns[mention.id] && dbGuild.warns[mention.id].warns + 1 >= 3) {
    Mike.models.snap({
      object: message,
      message: `This user has 3 (or more) warns. Should I take ban action?\n\`y/n\``,
      thumbnail: mention.user.displayAvatarURL
    })
    const answer = await Mike.Collector.awaitMessage(message.channel.id, message.author.id, 20*1000)

    if (answer.content.toLowerCase() == 'y') {
      if (mention.bannable) {
        mention.ban()
        Mike.models.snap({
          object: message,
          message: ``,
          author: [`${mention.user.tag} has been banned.`, mention.user.displayAvatarURL],
        })
      } else {
        return Mike.models.snap({
          object: message,
          message: `\`I can not ban this user.\``,
          color: '#f44262'
        })
      }

    }
  }

}
exports.data = {
  triggers: ['warn'],
  description: 'Warns user.',
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
  ]
}
