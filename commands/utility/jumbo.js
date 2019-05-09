const discord = require('discord.js');
const snek = require('snekfetch');
const twemoji = require('twemoji');
const fs = require('fs');

exports.output = async ({message, args}) => {
    try {
        const emote = discord.Util.parseEmoji(args[0]);
        if (emote.animated === true) {
          const URL = `https://cdn.discordapp.com/emojis/${emote.id}.gif?v=1`;
          const { body: buffer } = await snek.get(`${URL}`);
          message.channel.send({ file: buffer});
        } else if (emote.id === null) {
              const twemote = twemoji.parse(args[0]);
              const regex = /src="(.+)"/g;
              const regTwemote = regex.exec(twemote)[1];
              const { body: buffer } = await snek.get(`${regTwemote}`);
              await message.channel.send({ file: buffer});
        } else {
          const URL = `https://cdn.discordapp.com/emojis/${emote.id}.png`;
          const { body: buffer } = await snek.get(`${URL}`);
          message.channel.send({ file: buffer });
        }
    } catch (error) {
        return Mike.exec.error(message, 'Please provide a valid emoji!')
    }
}

exports.data = {
    triggers: ['jumbo'],
    description: 'Shows preview of emoji.',
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
