const weather = require('weather-js')

exports.output = async ({message, args}) => {
  weather.find({ search: args.join(' '), degreeType: 'C' }, function(err, result) {
    if (!result || result.length < 1 || err) {
        return Mike.models.snap({
          object: message,
          message: '\`The city you were looking for was not found.\`',
          color: '#f44262'
        })
    }
    return Mike.models.mult({
      object: message,
      description: `Current weather for ${result[0].location.name}`,
      fields: [
        ['Location', result[0].location.name, true],
        ['Coordinates', `${result[0].location.lat}, ${result[0].location.long}`, true],
        ['Time Zone', `UTC${result[0].location.timezone >= 0 ? `+${result[0].location.timezone}` : result[0].location.timezone}`, true],
        ['Condition', result[0].current.skytext, true],
        ['Temperature', `${result[0].current.temperature} \u00B0${result[0].location.degreetype}`, true],
        ['Feels Like', `${result[0].current.feelslike} \u00B0${result[0].location.degreetype}`, true],
        ['Low', `${result[0].forecast[1].low} \u00B0${result[0].location.degreetype}`, true],
        ['High', `${result[0].forecast[1].high} \u00B0${result[0].location.degreetype}`, true],
        ['Windspeed', result[0].current.winddisplay, true],
        ['Humidity', `${result[0].current.humidity}%`, true],
        ['Precipitation', `${result[0].forecast[1].precip} cm`, true],
        ['Observation Time', result[0].current.observationtime, true]
      ],
      thumbnail: `https://resources.bastionbot.org/images/weather/${result[0].current.skycode}.png`,
    })
  });
}
exports.data = {
  triggers: ['weather'],
  description: 'Shows the weather.',
  usage: [
      '{prefix}{command} <city>',
  ],
  args: [
    {
      'type':'text',
      'name':'city'
    }
  ]
}
