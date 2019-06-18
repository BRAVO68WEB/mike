var steam = require('steam-provider')
var provider = new steam.SteamProvider()

exports.output = async ({message, args}) => {
  const game = args.slice(0).join(' ');
  provider.search(game).then(result => {
  if (result.length == 0){
      return Mike.models.snap({
        object: message,
        message: '\`Game not found.\`',
        color: '#f44262'
      })
  }
  provider.detail(result[0].id, "en", "us").then(results => {
    return Mike.models.mult({
      object: message,
      author: [`Steam Store - ${result[0].name}`],
      fields: [
        ['Game ID', result[0].id, true],
        ['Genres', results.genres, true],
        ['Price', results.priceData.finalPrice == `0.0` ? `free` : `${results.priceData.finalPrice}$`, true],
        ['Platforms', results.otherData.platforms, true],
        ['Metacritics',  results.otherData.metacriticScore ? results.otherData.metacriticScore : '-', true],
        ['Features', results.otherData.features, true],
        ['Developer/s', results.otherData.developer, true],
        ['Publisher/s', results.otherData.publisher, true],
      ],
      thumbnail: `https://cdn.discordapp.com/attachments/458004691402489856/470344660364034049/steam.png`,
      image: results.otherData.imageUrl
    }).catch(e => {
        return Mike.models.snap({
          object: message,
          message: '\`Game not found.\`',
          color: '#f44262'
        })
      })
    })
  })
}
exports.data = {
  triggers: ['steam'],
  description: 'Shows game on steam info.',
  usage: [
    '{prefix}{command} <name>',
  ],
  args: [
    {
      'type':'text',
      'name':'game'
    }
  ]
}
