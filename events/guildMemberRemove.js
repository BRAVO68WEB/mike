const Discord = require('discord.js')

module.exports = async (member) => {
  await Mike.db.getGuild(member.guild.id).then(async guild => {
  
    if(!guild.settings.disabledPlugins.includes("logs") && guild.plugins.logs.member.enabled) {

      const channel = member.guild.channels.get(guild.plugins.logs.member.channel)
      
      if(!channel) return

      const embed = new Discord.RichEmbed()
          .setDescription(`Member Left`)
          .addField(`User`, member.user.tag, true)
          .addField(`User ID`, member.id, true)
          .setTimestamp()
          .setThumbnail(member.user.displayAvatarURL)
          .setColor("RED")
      
          channel.send(embed).catch(e => {
            console.log(e)
      })
    }
  })
}
