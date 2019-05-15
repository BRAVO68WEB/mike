const snek = require('snekfetch');
const moment = require('moment');

exports.output = async ({message, args}) => {
    snek.get(`https://api.twitch.tv/kraken/streams/${args.join(" ")}`)
    .set({
      'Client-ID': Mike.config.tokens.twitch,
      'Accept':'Accept: application/vnd.twitchtv.v3+json'
    })
    .then(async response => {
      let answer = response.body;
      console.log(answer)
      if (answer.stream === null) {
          Mike.exec.error(message, 'This channel is not 🔴 Live.')
      } else {
          return Mike.exec.mult(message, [
              ['Streamer', answer.stream.channel.display_name, false],
              ['Game', answer.stream.game, true],
              ['Viewers', answer.stream.viewers, true]
          ], ``,answer.stream.channel.logo, answer.stream.preview.large,null,`[[link]](${answer.stream.channel.url})`)
      }
  }).catch(err => {
      if(err) return console.log(err);
  });
}

exports.data = {
    triggers: ['twitch'],
    description: 'Get streaming information of a live Twitch channel.',
    usage: [
        '{prefix}{command} <streamer>',
    ],
    args: [
        {
            'type':'any',
            'name':'streamer'
        }
    ]
}
