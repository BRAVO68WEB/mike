const Discord = require('discord.js');

module.exports = async (member) => {
    await Mike.db.getGuild(member.guild.id).then(guild => {
    if(!guild.settings.mlogs.enabled) return;
    var channel = member.guild.channels.get(guild.settings.mlogs.channel);
    if(channel == undefined) return;

    const embed = new Discord.RichEmbed()
        .setDescription(`Member Left`)
        .addField(`User`,member.user.tag,true)
        .addField(`User ID`,member.id ,true)
        .setTimestamp()
        .setColor("RED")
    channel.send(embed).catch(e => {
          Mike.utils.log.error(e)
    });
});



}
