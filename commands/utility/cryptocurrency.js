const snek = require('snekfetch');

exports.output = async ({message, args}) => {
    const c = args.slice(0).join(' ');
    let ok = false;
    snek.get('https://api.coinmarketcap.com/v2/listings/').then(async response => {
        response.body.data.forEach(function(element) {
            if(element.website_slug == c.replace(' ', '-')) {
                ok = true;
                snek.get(`https://api.coinmarketcap.com/v2/ticker/${element.id}`).then(async cc => {
                    return Mike.exec.snap(message,`${cc.body.data.name}\n**Symbol: **\`${cc.body.data.symbol}\`\n**Rank: **\`${cc.body.data.rank}\`\n**USD Price: **\`${cc.body.data.quotes.USD.price}\`\n\n**% Change in 1H: **\`${cc.body.data.quotes.USD.percent_change_1h}\`\n**% Change in 24H: **\`${cc.body.data.quotes.USD.percent_change_24h}\`\n**% Change in 7D: **\`${cc.body.data.quotes.USD.percent_change_7d}\``, false)
                });
            }
        });
        if (!ok) {
            return Mike.exec.error(message, "The cryptocurrency you provided was not found!")
        }
    }).catch(err => {
        if(err) return console.log(err);
    });


}

exports.data = {
    triggers: ['cryptocurrency','cc'],
    description: 'Gives cryptocurrency info.',
    usage: [
        '{prefix}{command} <name>',
    ],
    args: [
        {
            type:'any',
            name:'name'
        }
    ],
    cooldown: 10
}
