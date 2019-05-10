const Discord = require('discord.js');

module.exports = async (oldMessage, newMessage) => {
  if (oldMessage.content === newMessage.content) return;
  if (!oldMessage.guild) return;
  if (newMessage.author.bot) return;
  try {
    await Mike.db.getGuild(oldMessage.guild.id).then(async guild => {
    if(guild.settings.mupdatelogs.enabled) {
      channel = newMessage.guild.channels.get(guild.settings.mupdatelogs.channel);
      if(channel == undefined) return;

      const embed = new Discord.RichEmbed()
          .setDescription(`Message Updated`)
          .addField(`User`,newMessage.author.tag,true)
          .addField(`User ID`,newMessage.author.id ,true)
          .addField(`Old Message`,oldMessage.content)
          .addField(`New Message`,newMessage.content)
          .addBlankField()
          .setTimestamp()
          .setColor("#ce72ea")
      channel.send(embed).catch(e => {
            Mike.utils.log.error(e)
      });
    }
    })
  } catch (e) {
      console.log(e)
  }
}
