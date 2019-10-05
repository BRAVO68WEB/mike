const Discord = require('discord.js')

module.exports = async (member) => {
  let channel

  await Mike.db.getGuild(member.guild.id).then(async guild => {
  
    if(!guild.settings.disabledPlugins.includes("logs") && guild.plugins.logs.member.enabled) {

      channel = member.guild.channels.get(guild.plugins.logs.member.channel)
      
      if(!channel) return

      const embed = new Discord.RichEmbed()
          .setDescription(`Member Joined`)
          .addField(`User`, member.user.tag, true)
          .addField(`User ID`, member.id, true)
          .setTimestamp()
          .setThumbnail(member.user.displayAvatarURL)
          .setColor("GREEN")
      
          channel.send(embed).catch(e => {
            console.log(e)
      })
    }

    if(guild.plugins.welcomer.enabled) {
      
      channel = member.guild.channels.get(guild.plugins.welcomer.channel)
      
      if(!channel) return

      let msg = guild.plugins.welcomer.message
        .replace(new RegExp("{user.name}", "g"), member.user.username)
        .replace(new RegExp("{user.mention}", "g"), `<@${member.user.id}>`)
        .replace(new RegExp("{user.tag}", "g"), member.user.discriminator)
        .replace(new RegExp("{user.id}", "g"), member.user.id)

        .replace(new RegExp("{server.name}", "g"), member.guild.name)
        .replace(new RegExp("{server.members}", "g"), member.guild.members.filter(m => !m.user.bot).size)
        .replace(new RegExp("{server.bots}", "g"), member.guild.members.filter(m => m.user.bot).size)
        .replace(new RegExp("{server.id}", "g"), member.guild.id)
        
        .replace(new RegExp("{channel.id}", "g"), channel.id)
        .replace(new RegExp("{channel.mention}", "g"), channel)
        .replace(new RegExp("{channel.name}", "g"), channel.name)

        if (msg.includes('{noeveryone}')) {
          msg = msg.replace('{noeveryone}','').replace('@everyone','')
        }

        if (msg.includes('{delete}')) {
            msg = msg.replace('{delete}','')
        }

        msg = await Mike.utils.string.customparse(msg)  

        channel.send(msg).catch(e => {
          console.log(e)
        })
    }

  })

}
