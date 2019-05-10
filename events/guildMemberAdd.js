const Discord = require('discord.js');

module.exports = async (member) => {
    let channel
    await Mike.db.getGuild(member.guild.id).then(async guild => {
    if(guild.settings.mlogs.enabled) {
      channel = member.guild.channels.get(guild.settings.mlogs.channel);
      if(channel == undefined) return;

      const embed = new Discord.RichEmbed()
          .setDescription(`New Member`)
          .addField(`User`,member.user.tag,true)
          .addField(`User ID`,member.id ,true)
          .setTimestamp()
          .setColor("GREEN")
      channel.send(embed).catch(e => {
            Mike.utils.log.error(e)
      });
    }
    if(guild.settings.wmess.enabled) {
      channel = member.guild.channels.get(guild.settings.wmess.channel);
      if(channel == undefined) return;

      let msg = guild.settings.wmess.message
        .replace(new RegExp("{user.name}", "g"), member.user.username)
        .replace(new RegExp("{tag}", "g"), member.user.tag)
        .replace(new RegExp("{server.name}", "g"), member.guild.name)
        .replace(new RegExp("{server.count}", "g"), member.guild.members.filter(m => !m.user.bot).size)
        .replace(new RegExp("{user.mention}", "g"), `<@${member.user.id}>`)
        .replace(new RegExp("{user.tag}", "g"), member.user.discriminator);
      msg = await Mike.utils.string.sparse(msg)
      channel.send(msg).catch(e => {
            Mike.utils.log.error(e)
      });
    }
});



}
