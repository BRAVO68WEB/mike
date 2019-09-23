const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js')
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: ':book: Info',
  id: 'info',
  description: 'Get more info about anything!',
  author: 'Badosz#0001',
  commands: commands,
  devOnly: false,
  hiddenInHelp: false
}
