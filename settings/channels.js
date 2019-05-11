module.exports = async (message, guild, args) => {
  if(args[1] == "enable" || args[1] == "disable"){
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
              if(args[1] == "enable") {
                for( var i = 0; i < guild.settings.disabledChannels.length; i++){
                   if (guild.settings.disabledChannels[i] === channel) {
                     guild.settings.disabledChannels.splice(i, 1);
                   }
                }
              } else {
                if (guild.settings.disabledChannels.includes(channel)) {
                  return Mike.exec.error(message,"This channel was already disabled.",)
                }
                guild.settings.disabledChannels.push(channel)

              }
              await Mike.db.update('guilds', message.guild.id, "settings", guild.settings);
              await Mike.db.getGuild(message.guild.id)
              return Mike.exec.snap(message,"Done.")
          } else {
              return Mike.exec.error(message,"Channel not found.")
          }
      } else {
          return Mike.exec.error(message,"You need to mention a channel.")
      }

      if (args[1] == "enable") guild.settings.mlogs.enabled  = true
      else guild.settings.mlogs.enabled = false
      await Mike.db.update('guilds', message.guild.id, "settings", guild.settings)
      await Mike.db.getGuild(message.guild.id)
      return Mike.exec.snap(message,"Done.")
  } else {
      return Mike.exec.error(message,"You can only disable or enable this option.",)
  }


}
