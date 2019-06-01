const snek = require('snekfetch');

exports.output = async ({message, args}) => {
    snek.get(`https://api.fortnitetracker.com/v1/profile/pc/${encodeURIComponent(args.join(' '))}`)
        .set({
          'TRN-Api-Key': Mike.config.tokens.fortnite,
          'User-Agent': `Mike Bot`
        })
        .then(async response => {
          const player = response.body;

          let stats = player.lifeTimeStats.map(stat => {
            return [
              stat.key,
              stat.value,
              true
            ]
          })
          Mike.exec.mult(message, stats, ``, `https://i.imgur.com/dfgwClZ.jpg`)
        }).catch(err => {
            if(err) return console.log(err);
        });
}

exports.data = {
    triggers: ['fortnite'],
    description: 'Shows your fortnite stats.',
    usage: [
        '{prefix}{command} <username>',
    ],
    args: [
        {
            'type':'any',
            'name':'username'
        }
    ]
}
