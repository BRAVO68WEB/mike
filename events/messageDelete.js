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
    }catch(e) {
      console.log(e)
    }
    try {
      await Mike.db.getGuild(message.guild.id).then(async guild => {
      if(guild.settings.mdeletelogs.enabled) {
        channel = message.guild.channels.get(guild.settings.mdeletelogs.channel)
        if(channel == undefined) return
        const embed = new Discord.RichEmbed()
            .setDescription(`Message Deleted`)
            .addField(`User`,message.author.tag,true)
            .addField(`User ID`,message.author.id ,true)
            .addField(`Message`,message.content, false)
            .setColor("RED")
        channel.send(embed).catch(e => {
              Mike.utils.log.error(e)
        })
      }
      })
    } catch (e) {
        console.log(e)
    }
}
