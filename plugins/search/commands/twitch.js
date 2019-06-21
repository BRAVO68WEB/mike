const moment = require('moment')

exports.output = async ({message, args}) => {
  Mike.http.get(`https://api.twitch.tv/kraken/streams/${args.join(" ")}`)
  .set({
    'Client-ID': Mike.tokens.twitch,
    'Accept':'Accept: application/vnd.twitchtv.v3+json'
  })
  .then(async response => {
    let answer = response.body
    if (answer.stream === null) {
        return Mike.models.snap({
          object: message,
          message: '\`This channel is not 🔴 Live.\`',
          color: '#f44262'
        })
    } else {
      return Mike.models.mult({
        object: message,
        fields: [
          ['Streamer', `[${answer.stream.channel.display_name}](${answer.stream.channel.url})`, false],
          ['Game', answer.stream.game, true],
          ['Viewers', answer.stream.viewers, true]
        ],
        thumbnail: answer.stream.channel.logo,
        image: answer.stream.preview.large
      })
    }
}).catch(err => {
    return require('../../../handlers/error')(message, error)
})
}

exports.data = {
  triggers: ['twitch'],
  description: 'Get streaming information of a live Twitch channel.',
  usage: [
    '{prefix}{command} <streamer>',
  ],
  args: [
    {
      'type':'text',
      'name':'streamer'
    }
  ]
}
