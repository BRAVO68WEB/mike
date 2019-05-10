const Discord = require('discord.js');

module.exports = async (reaction, user) => {
    Mike.stats.events.reactions += 1
    if (!reaction.message.guild) return;
    if (reaction.emoji.name !== "⭐") return;
    const guild = await Mike.db.getGuild(reaction.message.guild.id);
    let star = guild.star
    if(star == undefined) star = { enabled: false, channel: '', number: 2 };
    if (!star.enabled) return
    const starChannel = reaction.message.guild.channels.get(star.channel);
    const hasContent = reaction.message.content && reaction.message.content.length || reaction.message.attachments.size && reaction.message.attachments.first().height;
    const total = reaction.message.reactions.find(r => r.emoji.name === '⭐') ? reaction.message.reactions.find(r => r.emoji.name === '⭐').count : 0 ;
    const fetch = await starChannel.fetchMessages({ limit: 100 });
    const starMsg = fetch.find(m => m.embeds[0] && m.embeds[0].footer && m.embeds[0].footer.text.startsWith("⭐") && m.embeds[0].footer.text.endsWith(reaction.message.id));
    if (hasContent && total >= star.number) {
        let image = '';
        if (reaction.message.attachments.size) {
            if (reaction.message.attachments.first().height) {
                image = reaction.message.attachments.first().url;
            }
        }
        if (image || reaction.message.content) {
            if (reaction.message.guild.channels.has(star.channel)) {
                if(starMsg){
                    const embed = new Discord.RichEmbed()
                        .setDescription(`**Author: **${reaction.message.author.tag}\n**Channel: **${reaction.message.channel.toString()}\n**Message:**\n${reaction.message.content}\n\n[[link]](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id})`)
                        .setFooter(`⭐${reaction.message.reactions.get("⭐").count} | ID: ${reaction.message.id}`)
                        .setImage(image)
                        .setThumbnail(reaction.message.author.displayAvatarURL)
                        .setTimestamp();
                    const oldMsg = await starChannel.fetchMessage(starMsg.id);
                    await oldMsg.edit({ embed })
                }else{
                    const embed = new Discord.RichEmbed()
                    .setDescription(`**Author: **${reaction.message.author.tag}\n**Channel: **${reaction.message.channel.toString()}\n**Message:**\n${reaction.message.content}\n\n[[link]](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id})`)
                    .setFooter(`⭐${reaction.message.reactions.get("⭐").count} | ID: ${reaction.message.id}`)
                    .setImage(image)
                    .setThumbnail(reaction.message.author.displayAvatarURL)
                    .setTimestamp();
                    reaction.message.guild.channels.get(star.channel).send(embed);
                }
            }
        }
    }
}
