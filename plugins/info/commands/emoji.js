const discord = require('discord.js')
const twemoji = require('twemoji')

exports.output = async ({message, args}) => {
  try {
    const emote = discord.Util.parseEmoji(args[0])
    const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/)
    let emoji = {}
    let name = '???'
    let guild = '???'
    let id = '???'
    if (match && match[1]){
      emoji = Mike.emojis.get(match[1])
    }
    let URL = null
    if (emote.animated === true) {
      URL = `https://cdn.discordapp.com/emojis/${emote.id}.gif?v=1`
      name = (emote ? emote.name : '???')
      guild = '???'
      id = (emoji ? emote.name : '???')
    } else if (emote.id === null) {
        const twemote = twemoji.parse(args[0])
        const regex = /src="(.+)"/g
        const regTwemote = regex.exec(twemote)[1]
        URL = regTwemote
        name = '???'
        guild = '???'
        id = '???'
      } else {
          URL = `https://cdn.discordapp.com/emojis/${emote.id}.png`
          name = (emoji ? emoji.name : '???')
          guild = (emoji ? emoji.guild.name : '???')
          id = (emoji ? emoji.id : '???')

      }
      return Mike.models.snap({
        object: message,
        message: `${name}

                  **Guild: **${guild}
                  **ID: **${id}
                  **Url: **[[link]](${URL})`,
        thumbnail: URL
      })
    } catch (error) {
        return Mike.models.snap({
          object: message,
          message: '\`Please provide a valid emoji!\`',
          color: '#f44262'
        })
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
        type:'emoji',
        name:'emoji'
    }
  ]
}
