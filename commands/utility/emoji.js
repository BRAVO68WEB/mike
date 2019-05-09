const discord = require('discord.js');
const snek = require('snekfetch');
const twemoji = require('twemoji');
const fs = require('fs');

exports.output = async ({message, args}) => {
    try {
        const emote = discord.Util.parseEmoji(args[0]);
        const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/);
        let emoji = {}
        let name = '???'
        let guild = '???'
        let id = '???'
        if (match && match[1]){
            emoji = Mike.emojis.get(match[1])
        }
        let URL = null
        if (emote.animated === true) {
          URL = `https://cdn.discordapp.com/emojis/${emote.id}.gif?v=1`;
          name = (emote ? emote.name : '???')
          guild = '???'
          id = (emoji ? emote.name : '???')
        } else if (emote.id === null) {
            const twemote = twemoji.parse(args[0]);
            const regex = /src="(.+)"/g;
            const regTwemote = regex.exec(twemote)[1];
            URL = regTwemote
            name = '???'
            guild = '???'
            id = '???'
        } else {
            URL = `https://cdn.discordapp.com/emojis/${emote.id}.png`;
            name = (emoji ? emoji.name : '???')
            guild = (emoji ? emoji.guild.name : '???')
            id = (emoji ? emoji.id : '???')

        }
        return Mike.exec.snap(message,`${name}\n**Guild: **${guild}\n**ID: **${id}\n**Url: **[link](${URL})`, false,URL)
      } catch (error) {
          console.log(error)
            return Mike.exec.error(message, 'Please provide a valid emoji!')
        }
}

exports.data = {
  triggers: ['emoji'],
  description: 'Shows information and a preview of emoji.',
  usage: [
      '{prefix}{command} <emoji>',
  ],
  args: [
      {
          type:'any',
          name:'emoji'
      }
  ]
}
