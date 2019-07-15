module.exports = async (message) => {
  if (message.author.bot) return
  if (!message.guild) return

  if (message.content == `<@${Mike.user.id}>` || message.content == `<@!${Mike.user.id}>`) {
    return require('../handlers/message/mention')(message)
  }

  if (message.content.includes('wikipedia.org')) {
    require('../handlers/message/url')(message)
  }

  if (message.content.startsWith('$mike') && Mike.roles.developers.includes(message.author.id)) {
    return require('../handlers/message/cli')(message)
  }

  const dbGuild = await Mike.db.getGuild(message.guild.id)

  await Mike.db.addXp(message.author.id, message.guild.id, message, dbGuild)

  let messagePrefix = Mike.prefix

  if (dbGuild.prefix && message.content.startsWith(dbGuild.prefix)) {
    messagePrefix = dbGuild.prefix
  }

  if(dbGuild.plugins.customcmds){
    require('../handlers/message/customcmd')(message, messagePrefix, dbGuild)
  }

  if (message.content.startsWith(messagePrefix)) {
    return require('../handlers/message/command')(message, messagePrefix, dbGuild)
  }
}
