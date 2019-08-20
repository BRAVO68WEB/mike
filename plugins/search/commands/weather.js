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
        [':map: Location', result[0].location.name, true],
        [':map: Coordinates', `${result[0].location.lat}, ${result[0].location.long}`, true],
        [':clock3: Time Zone', `UTC${result[0].location.timezone >= 0 ? `+${result[0].location.timezone}` : result[0].location.timezone}`, true],
        [':cloud: Condition', result[0].current.skytext, true],
        [':thermometer: Temperature', `${result[0].current.temperature} \u00B0${result[0].location.degreetype}`, true],
        [':thermometer: Feels Like', `${result[0].current.feelslike} \u00B0${result[0].location.degreetype}`, true],
        [':thermometer: Low', `${result[0].forecast[1].low} \u00B0${result[0].location.degreetype}`, true],
        [':thermometer: High', `${result[0].forecast[1].high} \u00B0${result[0].location.degreetype}`, true],
        [':dash: Windspeed', result[0].current.winddisplay, true],
        [':droplet: Humidity', `${result[0].current.humidity}%`, true],
        [':cloud_rain: Precipitation', `${result[0].forecast[1].precip} cm`, true],
        [':clock2: Observation Time', result[0].current.observationtime, true]
      ],
      thumbnail: `https://resources.bastionbot.org/images/weather/${result[0].current.skycode}.png`,
    })
  })
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
