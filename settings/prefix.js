module.exports = async (message, guild, args) => {
  if(args[1]){
      await Mike.db.update('guilds', message.guild.id, "prefix", args[1])
      await Mike.db.getGuild(message.guild.id)
      return Mike.exec.snap(message,"Done.")
  }
  if (!args[1]) {
      return Mike.exec.error(message,"You need to specify new prefix.")
  }

}
