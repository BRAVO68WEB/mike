module.exports = async (message, guild) => {

  Mike.exec.snap(message,"Do you want to \`enable\` or \`disable\` Snipes?", false)
  const snipes = await Mike.Collector.awaitMessage(message.channel.id, message.author.id, 10*1000)
  if(snipes == "enable" || snipes == "disable"){
      if (snipes == "enable") guild.settings.snipes = true
      else guild.settings.snipes = false
      await Mike.db.update('guilds', message.guild.id, "settings", guild.settings)
      await Mike.db.getGuild(message.guild.id)
      return Mike.exec.snap(message,"Done.")
  } else {
      return Mike.exec.error(message,"Action cancelled.")
  }

  if (!lvlup) {
      return Mike.exec.error(message,"Action cancelled.")
  }

}
