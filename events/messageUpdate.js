const Discord = require('discord.js')

module.exports = async (oldMessage, newMessage) => {
  if (oldMessage.content === newMessage.content) return
  if (!oldMessage.guild) return
  if (newMessage.author.bot) return
  
  try {
    await Mike.db.getGuild(oldMessage.guild.id).then(async guild => {
    if (!guild.settings.disabledPlugins.includes("logs") && guild.plugins.logs.messages.enabled) {
      channel = newMessage.guild.channels.get(guild.plugins.logs.messages.channel)
      if(channel == undefined) return;
      console.log(newMessage)
      const embed = new Discord.RichEmbed()
          .setDescription(`Message Updated`)
          .addField(`User`,newMessage.author.tag,true)
          .addField(`Channel`,newMessage.channel,true)
          .addField(`User ID`,newMessage.author.id ,true)
          .addField(`New Message`,newMessage.content, false)
          .addField(`Old Message`,oldMessage.content, false)
          .setColor("#26b7b5")
      channel.send(embed).catch(e => {
            Mike.utils.log.error(e)
      });
    }
    })
  } catch (e) {
      console.log(e)
  }
}
