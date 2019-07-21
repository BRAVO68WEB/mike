exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])
  if(user.bot) {
    return Mike.models.snap({
      object: message,
      message: '\`Bots don\'t have levels!\`',
      color: '#f44262'
    })
  }
  const dbGuild = await Mike.db.getGuild(message.guild.id, false)
  const guildUser = dbGuild.users[user.id] ? dbGuild.users[user.id] : {lvl: 1, xp: 0, lvlnext: 80}
  Mike.models.mult({
    object: message,
    fields: [
      ["Guild", message.guild.name, false],
      ["Level",`\`${guildUser.lvl}\``, true],
      ["Xp",`\`${guildUser.xp}\`/\`${guildUser.lvlnext}\``, true]
    ],
    thumbnail: user.displayAvatarURL
  })

}
exports.data = {
    triggers: ['rank', 'level'],
    description: 'Shows user level.',
    usage: [
      '{prefix}{command} [mention]',
      '{prefix}{command} [id]',
      '{prefix}{command} [name]'
    ]
}
