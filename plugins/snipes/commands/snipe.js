exports.output = async ({message, dbGuild}) => {
  if (dbGuild.snipe.content == undefined) {
    return Mike.models.snap({
      object: message,
      message: '\`No snipes is this server!\`',
      color: '#f44262'
    })
  }
  const user = await Mike.fetchUser(dbGuild.snipe.author)
  if (dbGuild.snipe.image != null) dbGuild.snipe.content += `\n\n[[image link]](${data.snipe.image})`
  return Mike.models.snap({
    object: message,
    message: `\`${user.username} said:\`\n${dbGuild.snipe.content}`,
    thumbnail: user.displayAvatarURL
  })
}

exports.data = {
    triggers: ['snipe'],
    description: 'Shows last deleted message in server.'
}
