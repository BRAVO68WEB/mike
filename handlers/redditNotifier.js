const snek = require('snekfetch');
const Discord = require('discord.js');

module.exports = async () => {
    setInterval(async () => {
      try {
        if (!Mike.ready) return
        data = await Mike.db.filter({"settings":{"redditNotifier":{"enabled":true}}})
        for (let guild of data) {
          if (guild.settings.redditNotifier.subs.length == 0) continue;
          const channel = Mike.channels.get(guild.settings.redditNotifier.channel);
          if(channel == undefined) return;
          Mike.utils.log.reddit(`Checking ${guild.settings.redditNotifier.subs.length} subreddit${guild.settings.redditNotifier.subs.length == 1 ? `` : `s`} for ${guild.id}`)
          for (subreddit of guild.settings.redditNotifier.subs) {

            let response = await snek.get(`https://www.reddit.com/r/${subreddit}/new.json?sort=new`).catch(() => {})
            response = response.body
            const filters = {
                main: post => post.data.selftext.length <= 2000 && post.data.title.length <= 256
            };
            const posts = response.data.children.filter(filters.main);
            const post = posts[0]
            const postTitle = post.data.title.length > 256 ? `${post.data.title.slice(0, 253)}...` : post.data.title
            if(Mike.lastReddit[guild.id] == undefined) {
              Mike.lastReddit[guild.id] = {};
              if(Mike.lastReddit[guild.id][subreddit] == undefined) {
                Mike.lastReddit[guild.id][subreddit] = ``;
              }
            }
            if (Mike.lastReddit[guild.id][subreddit] == post.data.id) return
            Mike.utils.log.reddit(`Sending post from r/${subreddit} to ${guild.id}`)
            const embed = new Discord.RichEmbed()
                .setTitle(`New post on r/${subreddit}`)
                .setDescription(`**${postTitle}**\n${post.data.selftext}`)
                .setImage(post.data.url)
                .setColor("#ffe680")
                .setURL(`https://www.reddit.com${post.data.permalink}`)
                .setFooter(`👍 ${post.data.ups} | 💬 ${post.data.num_comments}`);
            await channel.send(embed).catch(e => {
                  Mike.utils.log.error(e)
            });
            Mike.lastReddit[guild.id][subreddit] = post.data.id;
          }

        }

      } catch (e) {
        console.log(e)
      }
    }, 15*1000);
};
