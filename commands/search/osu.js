const snek = require('snekfetch');

exports.output = async ({message, args}) => {
    const username = args[0];
    snek.get(`https://osu.ppy.sh/api/get_user?u=${username}&k=${Mike.config.tokens.osu}`).then(async response => {
        const osustats = response.body;
        if (osustats.length < 1) {
            Mike.exec.error(message, 'The username you provided was not found!')
        } else {
            return Mike.exec.mult(message, [
                ['Level', parseInt(osustats[0].level).toPrecision(), true],
                ['Ranked score', osustats[0].ranked_score, true],
                ['Total score', osustats[0].total_score, true],
                ['Country rank', osustats[0].pp_country_rank, true],
                ['PP', parseFloat(osustats[0].pp_raw).toFixed(), true],
                ['Accuracy', `${parseFloat(osustats[0].accuracy).toFixed(2)}%`, true]
            ], ``,`https://www.countryflags.io/${osustats[0].country.toLowerCase()}/flat/64.png`)
        }
    }).catch(err => {
        if(err) return console.log(err);
    });
}

exports.data = {
    triggers: ['osu'],
    description: 'Shows your OSU! infomations.',
    usage: [
        '{prefix}{command} <username>',
    ],
    args: [
        {
            'type':'any',
            'name':'text'
        }
    ]
}
