module.exports = async (message, guild, args) => {
  if(args[1] == "enable" || args[1] == "disable"){
    require("./models/endisub")(message, guild, args, 'redditNotifier')
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
            guild.settings.redditNotifier.channel = channel;
            await Mike.db.update('guilds', message.guild.id, "settings", guild.settings);
            await Mike.db.getGuild(message.guild.id)
            return Mike.exec.snap(message,"Done.")
        } else {
            return Mike.exec.error(message,"Channel not found.")
        }
    } else {
        return Mike.exec.error(message,"You need to mention a channel.")
    }
  } else if (args[1] == "add") {
      if (!args[2]) return Mike.exec.error(message,"You need to specify subreddit.")
      if (guild.settings.redditNotifier.subs.includes(args[2])) {
        return Mike.exec.error(message,"This subreddit is already in notifications.",)
      }
      if (guild.settings.redditNotifier.subs.length >= 5) {
        return Mike.exec.error(message,"\`You can't have more then 5 subreddits.",false)
      }
      if (!guild.ispremium) {
        return Mike.exec.error(message,"\`This option is\`[[premium]](https://www.patreon.com/badosz)\` only.\`",false)
      }
      guild.settings.redditNotifier.subs.push(args[2])
      await Mike.db.update('guilds', message.guild.id, "settings", guild.settings);
      await Mike.db.getGuild(message.guild.id)
      return Mike.exec.snap(message,"Done.")
  } else if (args[1] == "remove") {
    if (!args[2]) return Mike.exec.error(message,"You need to specify a subreddit.")
    for( var i = 0; i < guild.settings.redditNotifier.subs.length; i++){
       if (guild.settings.redditNotifier.subs[i] === args[2]) {
         guild.settings.redditNotifier.subs.splice(i, 1);
       }
    }
    await Mike.db.update('guilds', message.guild.id, "settings", guild.settings);
    await Mike.db.getGuild(message.guild.id)
    return Mike.exec.snap(message,"Done.")

  } else {
      return Mike.exec.error(message,"You need to specify settings.",)
  }


}
