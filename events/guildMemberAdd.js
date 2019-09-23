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
});



}
