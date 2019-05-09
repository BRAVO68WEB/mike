const Discord = require('discord.js')
var steam = require('steam-provider')
var provider = new steam.SteamProvider();

exports.output = async ({message, args}) => {
  const game = args.slice(0).join(' ');
  let steampng = "https://cdn.discordapp.com/attachments/458004691402489856/470344660364034049/steam.png"
  provider.search(game).then(result => {
  if (result.length == 0){
      return Mike.exec.error(message, 'Game not found')
  }
  provider.detail(result[0].id, "en", "us").then(results => {
    const embed = new Discord.RichEmbed()
        .setAuthor('Steam Store - ' + result[0].name, steampng)
        .addField(`Game ID`, result[0].id, true)
        .setImage(results.otherData.imageUrl,true)
        .addField('Genres', results.genres,true)
        .addField('Price', `**${results.priceData.finalPrice}** $`, true)
        .addField('Platforms', results.otherData.platforms, true)
        .addField('Metacritics', results.otherData.metacriticScore ? results.otherData.metacriticScore : '-', true)
        .addField('Features', results.otherData.features, true)
        .addField('Developer/s', results.otherData.developer, true)
        .addField('Publisher/s', results.otherData.publisher, true);
    return message.channel.send(embed).catch(e => {
        Mike.exec.error(message, 'Game not found')
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
            'type':'any',
            'name':'name'
        }
    ],
    cooldown: 10
}
