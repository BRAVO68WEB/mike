const snek = require('snekfetch');
const Discord = require('discord.js');

module.exports = async () => {
    setInterval(async () => {
      try {
        if (!Mike.ready) return
        data = await Mike.db.filter({"settings":{"streamNotifier":{"enabled":true}}})
        for (let guild of data) {
          if (guild.settings.streamNotifier.streamers.length == 0) continue;

          let response = await snek.get(`https://api.twitch.tv/kraken/streams/?channel=${encodeURIComponent(guild.settings.streamNotifier.streamers.join(','))}`)
          .set({
            'Client-ID': Mike.config.tokens.twitch,
            'Accept':'Accept: application/vnd.twitchtv.v3+json'
          }).catch(() => {})

          response = response.body

          if(response._total > 0 && response.streams.length > 0) {
            let streams = response.streams;

            if(Mike.lastStreamers[guild.id] == undefined) {
              Mike.lastStreamers[guild.id] = [];
            }
            else {
              Mike.lastStreamers[guild.id].forEach(async stream => {
                  if (!streams.map(stream => stream._id).includes(stream)) {
                    Mike.lastStreamers[guild.id].splice(Mike.lastStreamers[guild.id].indexOf(stream), 1);
                    await Mike.cacher.saveData('mike','lastStreamers', JSON.stringify(Mike.lastStreamers))
                  }
              });
            }
            Mike.utils.log.stream(`Checking ${guild.settings.streamNotifier.streamers.length} stream notfication${streams.length == 1 ? `` : `s`} for ${guild.id}`)
            for (let stream of streams) {
              if (!Mike.lastStreamers[guild.id].includes(stream._id)) {
                channel = Mike.channels.get(guild.settings.streamNotifier.channel);
                if(channel == undefined) return;
                const embed = new Discord.RichEmbed()
                  .setThumbnail(stream.channel.logo)
                  .setImage(stream.preview.large)
                  .setDescription(`[${stream.channel.display_name} is now 🔴 Live!](${stream.channel.url})`)
                  .addField(`Game`, stream.game, true)
                  .addField('Viewers', stream.viewers, true)
                  .setColor("#ffe680")
                await channel.send(embed).catch(e => {
                      Mike.utils.log.error(e)
                });
                await Mike.lastStreamers[guild.id].push(stream._id)
                await Mike.cacher.saveData('mike','lastStreamers', JSON.stringify(Mike.lastStreamers))
              }
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
    }, 10*1000);
};
