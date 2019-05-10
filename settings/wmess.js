module.exports = async (message, guild, args) => {
  if(args[1] == "enable" || args[1] == "disable"){
      if (args[1] == "enable") guild.settings.wmess.enabled  = true
      else guild.settings.wmess.enabled = false
      await Mike.db.update('guilds', message.guild.id, "settings", guild.settings)
      await Mike.db.getGuild(message.guild.id)
      return Mike.exec.snap(message,"Done.")
  } else if (args[1] == "channel") {
    let channel
    if (!args[2]) return Mike.exec.error(message,"You need to mention a channel.")
    if (args[2].startsWith('<#') && args[2].endsWith('>')) {
        const id =  args[2].replace(/[<#>]/g, '');
        if (message.guild.channels.has(id)) {
            channel = message.guild.channels.get(id).id;
        } else {
            channel = message.guild.channels.get(args[2]).id;
        }
        if (channel) {
            guild.settings.wmess.channel = channel;
            await Mike.db.update('guilds', message.guild.id, "settings", guild.settings);
            await Mike.db.getGuild(message.guild.id)
            return Mike.exec.snap(message,"Done.")
        } else {
            return Mike.exec.error(message,"Channel not found.")
        }
    } else {
        return Mike.exec.error(message,"You need to mention a channel.")
    }
  } else if (args[1] == "message") {
    if (!args[2]) return Mike.exec.error(message,"You need to specify message.")
    guild.settings.wmess.message = args.slice(2).join(' ');
    await Mike.db.update('guilds', message.guild.id, "settings", guild.settings);
    await Mike.db.getGuild(message.guild.id)
    return Mike.exec.snap(message,"Done.")
  } else {
      return Mike.exec.error(message,"You need to specify settings.",)
  }


}
