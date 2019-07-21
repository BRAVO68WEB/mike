const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js')
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: ':anchor: Utility',
  id: 'utility',
  description: 'Make your life easier!',
  author: '364056796932997121',
  commands: commands,
  devOnly: false,
  hiddenInHelp: false
}
