exports.output = async ({message}) => {
  const mention = message.mentions.members.first()
  
  let dbGuild = await Mike.db.getGuild(message.guild.id, false)
  
  dbGuild.warns[mention.id].warns = 0
  
  await Mike.db.update("guilds", message.guild.id, "warns", dbGuild.warns)
  
  Mike.models.snap({
    object: message,
    message: '',
    author: [`Cleared warns from user ${mention.user.tag}.`, mention.user.displayAvatarURL]
  })
}
exports.data = {
  triggers: ['warnsclear'],
  description: 'Resets user\'s warns.',
  usage: [
    '{prefix}{command} <mention>'
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
