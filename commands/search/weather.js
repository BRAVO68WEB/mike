const Discord = require('discord.js');
const weather = require('weather-js');

exports.output = async ({message, args}) => {
  weather.find({ search: args.join(' '), degreeType: 'C' }, function(err, result) {
      if (!result || result.length < 1 || err) {
          return Mike.exec.error(message, 'The city you were looking for was not found, try once more!')
      }
      const embed = new Discord.RichEmbed()
          .setDescription(`Current weather for ${result[0].location.name}`)
          .setThumbnail(`https://resources.bastionbot.org/images/weather/${result[0].current.skycode}.png`)
          .addField('Location', result[0].location.name, true)
          .addField('Coordinates', `${result[0].location.lat}, ${result[0].location.long}`, true)
          .addField('Time Zone', `UTC${result[0].location.timezone >= 0 ? `+${result[0].location.timezone}` : result[0].location.timezone}`, true)
          .addField('Condition', result[0].current.skytext, true)
          .addField('Temperature', `${result[0].current.temperature} \u00B0${result[0].location.degreetype}`, true)
          .addField('Feels Like', `${result[0].current.feelslike} \u00B0${result[0].location.degreetype}`, true)
          .addField('Low', `${result[0].forecast[1].low} \u00B0${result[0].location.degreetype}`, true)
          .addField('High', `${result[0].forecast[1].high} \u00B0${result[0].location.degreetype}`, true)
          .addField('Windspeed', result[0].current.winddisplay, true)
          .addField('Humidity', `${result[0].current.humidity}%`, true)
          .addField('Precipitation', `${result[0].forecast[1].precip} cm`, true)
          .addField('Observation Time', result[0].current.observationtime, true)
      return message.channel.send(embed);
  });
}
exports.data = {
    triggers: ['weather', 'w'],
    description: 'Shows the weather.',
    usage: [
        '{prefix}{command} <city>',
    ],
    args: [
        {
            'type':'any',
            'name':'city'
        }
    ]
}
