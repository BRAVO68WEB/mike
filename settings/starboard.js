module.exports = async (message, guild) => {

  Mike.exec.snap(message, `
  **1.** \`Enable\`
  **2.** \`Disable\`
  **3.** \`Change number of min. stars.\`
  **4.** \`Change Channel\`

  Type specific **number** to change settings.
  `, false)
  const s = await Mike.Collector.awaitMessage(message.channel.id, message.author.id, 10*1000)
  if(s == "1") {
      guild.star.enabled = true;
      await Mike.db.update('guilds', message.guild.id, "star", guild.star);
      await Mike.db.getGuild(message.guild.id)
      return Mike.exec.snap(message,"Done.")
  } else if (s == "2") {
      guild.star.enabled = false;
      await Mike.db.update('guilds', message.guild.id, "star", guild.star);
      await Mike.db.getGuild(message.guild.id)
      return Mike.exec.snap(message,"Done.")
  } else if (s == "3") {
      Mike.exec.snap(message,"Type number between 1 - 10.")
      const ns = await Mike.Collector.awaitMessage(message.channel.id, message.author.id, 10*1000)
      if(ns){
          if  (/^(1|2|3|4|5|6|7|8|9|10)$/i.test(ns)) {
              guild.star.number = parseInt(ns);
              await Mike.db.update('guilds', message.guild.id, "star", guild.star);
              await Mike.db.getGuild(message.guild.id)
              return Mike.exec.snap(message,"Done.")

          } else {
              return Mike.exec.error(message,"Action cancelled. (Number needs to be 1 - 10)")
          }
      }
      if (!ns) {
          return Mike.exec.error(message,"Action cancelled.")

      }
  } else if (s == "4") {
      Mike.exec.snap(message,"Mention new channel.")
      const nc = await Mike.Collector.awaitMessage(message.channel.id, message.author.id, 10*1000)
      let channel
      if(nc){
          if (nc.content.startsWith('<#') && nc.content.endsWith('>')) {
              const id =  nc.content.replace(/[<#>]/g, '');
              if (message.guild.channels.has(id)) {
                  channel = message.guild.channels.get(id).id;
              } else {
                  channel = message.guild.channels.get(nc.content).id;
              }
              if (channel) {
                  guild.star.channel = channel;
                  await Mike.db.update('guilds', message.guild.id, "star", guild.star);
                  await Mike.db.getGuild(message.guild.id)
                  return Mike.exec.snap(message,"Done.")
              } else {
                  return Mike.exec.error(message,"Action cancelled. (Channel not found)")
              }
          } else {
              return Mike.exec.error(message,"Action cancelled. (You need to mention a channel)")
          }
      } else {
          return Mike.exec.error(message,"Action cancelled.")
      }
  } else {
      return Mike.exec.error(message,"Action cancelled.")
  }

  if (!s) {
      return Mike.exec.error(message,"Action cancelled.")
  }
  
}
