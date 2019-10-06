exports.output = async ({message}) => {
  const dbGuild = await Mike.db.getGuild(message.guild.id, false)
  if (dbGuild.snipe.content == undefined) {
    return Mike.models.snap({
      object: message,
      message: '\`No snipes in this server!\`',
      color: '#f44262'
    })
  }
  const user = await Mike.fetchUser(dbGuild.snipe.author)
  if (dbGuild.snipe.image != null) dbGuild.snipe.content += `\n\n[[image link]](${data.snipe.image})`
  return Mike.models.snap({
    object: message,
    message: `${dbGuild.snipe.content}`,
    author: [user.tag, user.displayAvatarURL]
  })
}

exports.data = {
    triggers: ['snipe'],
    description: 'Shows last deleted message in server.'
}
