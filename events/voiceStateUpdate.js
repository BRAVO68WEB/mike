const Discord = require('discord.js');
module.exports = async (oldMem, newMem) => {
    Mike.stats.events.voiceUpdates += 1
    try{
        let vC = oldMem.voiceChannelID;
        let player = await Mike.player.get(oldMem.guild.id);
        if(!player || vC != player.channel) return;
        if(Mike.channels.get(player.channel).members.size == 1) {
            setTimeout(async () => {
                if (Mike.channels.get(player.channel).members.size == 1) {
                    let queue = Mike.queue[oldMem.guild.id];
                    if(queue) {
                        queue.songs = [];
                        queue.loop = false;
                        queue.repeat = false
                    }
                    await Mike.player.leave(oldMem.guild.id);
                    const embed = new Discord.RichEmbed()
                        .setDescription(`\`Left voice channel.\``)
                    Mike.channels.get(queue.channel).send(embed)
                }
            }, 10 * 1000);
        }
    }catch(err) {
        console.log(err);
    }
};
