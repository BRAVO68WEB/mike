exports.output = async ({message, args}) => {
    const cryptocurrency = args.slice(0).join(' ')
    let found = false
    Mike.http.get('https://api.coinmarketcap.com/v2/listings/').then(async response => {
      response.body.data.forEach(element => {
        if (element.website_slug == cryptocurrency.replace(' ', '-')) {
          found = true
          Mike.http.get(`https://api.coinmarketcap.com/v2/ticker/${element.id}`).then(async cc => {
            Mike.models.snap({
              object: message,
              message: `**${cc.body.data.name}**
                        Symbol: \`${cc.body.data.symbol}\`
                        Rank: \`${cc.body.data.rank}\`
                        USD Price: \`${cc.body.data.quotes.USD.price}\`
                        % Change in 1H: \`${cc.body.data.quotes.USD.percent_change_1h}\`
                        % Change in 24H: \`${cc.body.data.quotes.USD.percent_change_24h}\`
                        % Change in 7D: \`${cc.body.data.quotes.USD.percent_change_7d}\`
                        `,
            })
          })
        }
      })
      if (!found) {
        return Mike.models.snap({
          object: message,
          message: '\`The cryptocurrency you provided was not found!\`',
          color: '#f44262'
        })
      }
    }).catch(error => {
      return require('../../../handlers/error')(message, error)
    })


}

exports.data = {
  triggers: ['cryptocurrency','cc'],
  description: 'Gives cryptocurrency info.',
  usage: [
    '{prefix}{command} <name>',
  ],
  args: [
    {
      type:'text',
      name:'cryptocurrency'
    }
  ],
}
