exports.output = async ({message}) => {
  const data = await Mike.db.getGuild(message.guild.id);
  if (!data.settings.snipes) return Mike.exec.error(message,"Snipes are disabled in this guild.")
  if (!data.snipe.content == undefined) return Mike.exec.error(message,"No snipes is this guild.")
  const user = await Mike.fetchUser(data.snipe.author);
  if (data.snipe.image != null) data.snipe.content += `\n\n[[image link]](${data.snipe.image})`
  return Mike.exec.snap(message, `\`${user.username} said:\`\n${data.snipe.content}`,false, user.displayAvatarURL)
}

exports.data = {
    triggers: ['snipe'],
    description: 'Shows last deleted message in guild.'
}
