const Discord = require('discord.js')


module.exports = async (message) => {
  try {
    let img = null
    if (message.attachments.array()[0] != undefined) img = message.attachments.array()[0].url
    await Mike.db.update("guilds",message.guild.id,"snipe",{
      author: message.author.id,
      content: message.content,
      image: img
    })
    
  } catch(e) {
    console.log(e)
  }
  
  try {
    if (Date.now() - message.createdTimestamp < 10000) return
      await Mike.db.getGuild(message.guild.id).then(async guild => {
      if (!guild.settings.disabledPlugins.includes("logs") && guild.plugins.logs.messages.enabled) {
        channel = message.guild.channels.get(guild.plugins.logs.messages.channel)
        if (!channel) return
        const embed = new Discord.RichEmbed()
            .setDescription(`Message Deleted`)
            .addField(`User`,message.author.tag,true)
            .addField(`Channel`,message.channel,true)
            .addField(`User ID`,message.author.id ,true)
            .addField(`Channel ID`,message.channel.id ,true)
            .addField(`Message ID`,message.id, true)
            .addField(`Message`,message.content, true)
            .setColor("RED")
        channel.send(embed).catch(e => {
          console.log(e)
        })
      }
    })
  } catch (e) {
    console.log(e)
  }
}
