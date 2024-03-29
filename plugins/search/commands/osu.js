const snek = require('snekfetch')
let avatar = "";
exports.output = async ({message, args}) => {
  const username = args.join(" ")
  Mike.http.get(`https://osu.ppy.sh/api/get_user`)
           .query({
             u: username,
             k: Mike.tokens.osu
           })
           .then(async response => {
              const osustats = response.body
              if (osustats.length < 1) {
                return Mike.models.snap({
                  object: message,
                  message: '\`Player not found.\`',
                  color: '#f44262'
                })
              } else {
                return Mike.models.mult({
                  object: message,
                  title: `**${osustats[0].username}'s stats**`,
                  image: `https://www.countryflags.io/${osustats[0].country.toLowerCase()}/flat/64.png`,
                  fields: [
                    ['Level', parseInt(osustats[0].level).toPrecision(), true],
                    ['Ranked score', osustats[0].ranked_score, true],
                    ['Total score', osustats[0].total_score, true],
                    ['Country rank', osustats[0].pp_country_rank, true],
                    ['PP', parseFloat(osustats[0].pp_raw).toFixed(), true],
                    ['Accuracy', `${parseFloat(osustats[0].accuracy).toFixed(2)}%`, true],
                    ['Play count', osustats[0].playcount , true],
                    ['ID', osustats[0].user_id, true]
                  ],
                  thumbnail: `https://a.ppy.sh/${osustats[0].user_id}`,
                  footer: `Requested by ${message.author.tag} (${message.author.id})`
                })
              }
          }).catch(error => {
            return require('../../../handlers/error')(message, error)
          })
}

exports.data = {
  triggers: ['osu'],
  description: 'Shows your OSU! infomations.',
  usage: [
    '{prefix}{command} <username>',
  ],
  args: [
    {
      'type':'text',
      'name':'username'
    }
  ]
}
