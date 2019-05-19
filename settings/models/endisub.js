module.exports = async (message, guild, args, setting) => {
  if (args[1] == "enable") guild.settings[setting]['enabled'] = true
  else guild.settings[setting]['enabled'] = false
  await Mike.db.update('guilds', message.guild.id, "settings", guild.settings)
  await Mike.db.getGuild(message.guild.id)
  return Mike.exec.snap(message,"Done.")
}
