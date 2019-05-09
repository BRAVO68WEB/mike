module.exports = async (message, guild) => {

  Mike.exec.snap(message,"Type new prefix.")
  const prefix = await Mike.Collector.awaitMessage(message.channel.id, message.author.id, 10*1000)
  if(prefix){
      await Mike.db.update('guilds', message.guild.id, "prefix", prefix.content)
      await Mike.db.getGuild(message.guild.id)
      return Mike.exec.snap(message,"Done.")
  }
  if (!prefix) {
      return Mike.exec.error(message,"Action cancelled.")
  }

}
