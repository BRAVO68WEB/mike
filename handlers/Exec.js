const Discord = require('discord.js');
const snek = require('snekfetch');
const imageType = require('image-type');

class Exec {
    constructor(Mike) {
        this.Mike = Mike
    }

    async snap(message, text, hightlight = true, thumbnail = null, image = null, footer = ``) {
        const embed = new Discord.RichEmbed()
            .setDescription(`${hightlight ? `\``: ``}${text}${hightlight ? `\``: ``}`)
            .setThumbnail(thumbnail)
            .setImage(image)
            .setColor("#ffe680")
            .setFooter(footer)
        return message.channel.send(embed);
    }

    async mult(message, array, footer = ``, thumbnail = null, image = null,color=null, description=``) {
        const embed = new Discord.RichEmbed()
          .setDescription(description)
          .setThumbnail(thumbnail)
          .setImage(image)
        array.forEach(element => {
            if (element[0] == 'blank') {
                embed.addBlankField()
            } else {
                embed.addField(element[0], element[1], element[2])
            }
        });
        if (color == null) {
          embed.setColor("#ffe680")
        } else {
          embed.setColor(color)
        }
        embed.setFooter(footer)
        return message.channel.send(embed);
    }

    async error(message, text, hightlight = true) {
        const embed = new Discord.RichEmbed()
            .setDescription(`:name_badge: ${hightlight ? `\``: ``}${text}${hightlight ? `\``: ``}`)
        return message.channel.send(embed);
    }

    async badosz (message, endpoint, type, output = null, title = "") {
        snek.get(`http://api.badosz.com/${endpoint}`).set({ Authorization: Mike.config.tokens.badosz }).then(async response => {
            if (type == "text") {
                this.snap(message, response.body[output], true, null, null,  `api.badosz.com`)
            } else if (type == "image") {
                const type = imageType(response.body);
                const file = new Discord.Attachment(response.body, `file.${type ? type.ext : 'png'}`);
                const embed = new Discord.RichEmbed()
                    .setTitle(title)
                    .attachFile(file)
                    .setColor("#ffe680")
                    .setImage(`attachment://file.${type ? type.ext : 'png'}`)
                    .setFooter('api.badosz.com');
                return message.channel.send(embed);
            }
        }).catch(err => {
            if(err) return console.log("error", err);
        });

        if (type == "text") {

        }
    }

    async link  (message, link, title = '') {
        const embed = new Discord.RichEmbed()
            .setTitle(title)
            .setImage(link)
            .setColor("#ffe680")
        return message.channel.send(embed);
    }
    async reddit (message, sub, type) {
        snek.get(`https://www.reddit.com/r/${sub}/top/.json?sort=top&t=day&limit=400`).then(async response => {
            const filters = {
                image: post => post.data.post_hint === 'image',
                text: post => post.data.post_hint !== 'image' && post.data.selftext.length <= 2000 && post.data.title.length <= 256
            };
            const posts = response.body.data.children.filter(filters[type]);
            const post = posts[Math.floor(Math.random() * posts.length)]
            const postTitle = post.data.title.length > 256 ? `${post.data.title.slice(0, 253)}...` : post.data.title;

            if(type === "text"){
                const embed = new Discord.RichEmbed()
                    .setTitle(postTitle)
                    .setDescription(post.data.selftext)
                    .setImage((type === 'image' ? post.data.url : ''))
                    .setColor("#ffe680")
                    .setURL(`https://www.reddit.com${post.data.permalink}`)
                    .setFooter(`👍 ${post.data.ups} | 💬 ${post.data.num_comments}`);
                return message.channel.send(embed);
            }
            const embed = new Discord.RichEmbed()
                .setTitle(postTitle)
                .setImage((type === 'image' ? post.data.url : ''))
                .setURL(`https://www.reddit.com${post.data.permalink}`)
                .setColor("#ffe680")
                .setFooter(`👍 ${post.data.ups} | 💬 ${post.data.num_comments}`);
            return message.channel.send(embed);

        }).catch(err => {

            if(err) return console.log(err);

        });


    }
}

module.exports = Exec
