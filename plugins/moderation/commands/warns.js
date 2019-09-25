exports.output = async ({message}) => {
  const mention = message.mentions.members.first()
  const dbGuild = await Mike.db.getGuild(message.guild.id, false)
  const warns = dbGuild.warns[mention.id] ? dbGuild.warns[mention.id].warns : 0
  Mike.models.snap({
    object: message,
    message: ``,
    author: [`${mention.user.tag} has currently ${warns} warn${warns == 1 ? '' : 's'}.`, mention.user.displayAvatarURL]
  })
}
exports.data = {
  triggers: ['warns'],
  description: 'Shows how many warns user has.',
  usage: [
    '{prefix}{command} <mention>'
  ],
  args: [
    {
      'type':'mention',
      'name':'user'
    },
  ]
}
