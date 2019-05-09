const weather = require('weather-js');

exports.output = async ({message, args}) => {
    weather.find({ search: args.join(' '), degreeType: 'C' }, async function(err, result) {
        if (!result || result.length < 1 || err)  return Mike.exec.error(`The city you were looking for was not found, try once more!`)
        let date = await Mike.utils.timezone.getdate(parseFloat(result[0].location.timezone)).toUTCString()
        date = date.substring(0, date.length - 4);
        return Mike.exec.snap(message,`${result[0].location.name}\n${date}`)
    });
}

exports.data = {
    triggers: ['date'],
    description: 'Shows the date in selected city.',
    usage: [
        '{prefix}{command} <city>',
    ],
    args: [
        {
            type:'any',
            name:'city'
        }
    ]
}
