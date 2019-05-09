const snek = require('snekfetch');

exports.output = async ({message, args}) => {
    const regionArray = []
    const regions = {
    	"BR": "BR1",
    	"EUNE": "EUN1",
    	"EUW": "EUW1",
    	"JP": "JP1",
    	"KR": "KR",
    	"LAN": "LA1",
    	"LAS": "LA2",
    	"NA": "NA1",
    	"OCE": "OC1",
    	"TR": "TR1",
    	"RU": "RU"
    }
    let region = args[0]
	  for (const key in regions) {
  		region = region.replace(new RegExp(key, "ig"), regions[key])
  		regionArray.push(regions[key])
    }
    const username = args.slice(1).join(" ");
    const regionsList = Object.keys(regions).join("` `")
    if (regionArray.indexOf(region) == -1) return Mike.exec.error(message, `That's not a valid region. Here is a list of all of the valid regions:\n${regionsList}`)

    snek.get(`https://${region}.api.riotgames.com/lol/summoner/v3/summoners/by-name/${username}?api_key=${Mike.config.tokens.lol}`).then(async response => {
      const info = JSON.parse(res.text)
      if (info.id == undefined) return Mike.exec.error(messaage, `I couldn't find a summoner called ${username}. Try again with a different region.`)
        // if (osustats.length < 1) {
        //     Mike.exec.error(message, 'The username you provided was not found!')
        // } else {
        //     return Mike.exec.mult(message, [
        //         ['Level', parseInt(osustats[0].level).toPrecision(), true],
        //         ['Ranked score', osustats[0].ranked_score, true],
        //         ['Total score', osustats[0].total_score, true],
        //         ['Country rank', osustats[0].pp_country_rank, true],
        //         ['PP', parseFloat(osustats[0].pp_raw).toFixed(), true],
        //         ['Accuracy', `${parseFloat(osustats[0].accuracy).toFixed(2)}%`, true]
        //     ], ``,`https://www.countryflags.io/${osustats[0].country.toLowerCase()}/flat/64.png`)
        // }
        // console.log(info)

    }).catch(err => {
        if(err) return console.log(err);
    });
    console.log(`https://${region}.api.riotgames.com/lol/summoner/v3/summoners/by-name/${username}?api_key=${Mike.config.tokens.lol}`)}

exports.data = {
    triggers: ['league'],
    description: 'Gives information about a specific League of Legends user.',
    usage: [
        '{prefix}{command} <region> <username>',
    ],
    args: [
        {
            'type':'any',
            'name':'region'
        },
        {
            'type':'any',
            'name':'username'
        }
    ]
}
