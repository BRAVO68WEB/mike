const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js')
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: ':books: Basic',
  id: 'basic',
  description: 'Get more information about the bot!',
  author: 'Badosz#0001',
  commands: commands,
  devOnly: false,
  hiddenInHelp: false
}
