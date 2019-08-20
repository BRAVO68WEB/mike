exports.output = async ({message, args}) => {
  Mike.http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php')
    .query({
      s: args.join(" ")
    })
    .then(async response => {
      const cocktail = response.body
      if(!cocktail.drinks) {
        return Mike.models.snap({
          object: message,
          message: '\`Coctail not found!\`',
          color: '#f44262'
        })
      } else {
        Mike.models.snap({
          object: message,
          message: `**${cocktail.drinks[0].strDrink}**`,
          image: cocktail.drinks[0].strDrinkThumb
        })
      }
    })
}
exports.data = {
  triggers: ['cocktail'],
  description: 'cocktail',
  usage: [
    '{prefix}{command} <name>'
  ],
  args: [
    {
      'type':'any',
      'name':'text'
    }
  ]
}
