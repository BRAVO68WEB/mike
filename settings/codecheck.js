module.exports = async (message, guild, args) => {

  if(args[1] == "enable" || args[1] == "disable"){
      if (args[1] == "enable") guild.settings.codecheck = true
      else guild.settings.codecheck = false
      await Mike.db.update('guilds', message.guild.id, "settings", guild.settings)
      await Mike.db.getGuild(message.guild.id)
      return Mike.exec.snap(message,"Done.")
  } else {
      return Mike.exec.error(message,"You can only disable or enable this option.",)
  }

}
