const {Util} = require('discord.js')
const twemoji = require('twemoji')

exports.output = async ({message, args}) => {
  try {
    const emote = Util.parseEmoji(args[0])
    if (emote.animated === true) {
      const URL = `https://cdn.discordapp.com/emojis/${emote.id}.gif?v=1`
      const { body: buffer } = await Mike.http.get(`${URL}`)
      message.channel.send({ file: buffer })
    } else if (emote.id === null) {
          const twemote = twemoji.parse(args[0])
          const regex = /src="(.+)"/g
          const regTwemote = regex.exec(twemote)[1]
          const { body: buffer } = await Mike.http.get(`${regTwemote}`)
          await message.channel.send({ file: buffer})
    } else {
      const URL = `https://cdn.discordapp.com/emojis/${emote.id}.png`
      const { body: buffer } = await Mike.http.get(`${URL}`)
      message.channel.send({ file: buffer })
    }
  } catch (error) {
      return Mike.models.snap({
        object: message,
        message: '\`Please provide a valid emoji!\`',
        color: '#f44262'
      })
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
      type:'emoji',
      name:'emoji'
    }
  ]
}
