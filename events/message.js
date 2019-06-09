module.exports = async (message) => {
  if (message.author.bot) return
  if (!message.guild) return

  if (message.content == `<@${Mike.user.id}>`) {
    return require('../handlers/message/mention')(message)
  }

  const dbGuild = await Mike.db.getGuild(message.guild.id)

  let messagePrefix = Mike.prefix

  if (dbGuild.prefix && message.content.startsWith(guild.prefix)) {
    messagePrefix = dbGuild.prefix
  }

  if (message.content.startsWith(messagePrefix)) {
    return require('../handlers/message/command')(message, messagePrefix, dbGuild)
  }
}
