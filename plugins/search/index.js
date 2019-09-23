const commands = require('fs').readdirSync(`${__dirname}/commands/`)
  .filter(file => file !== 'index.js')
  .map(file => require(`${__dirname}/commands/${file}`))

module.exports = {
  name: ':mag: Search',
  id: 'search',
  description: 'Search for eveything you want!',
  author: 'Badosz#0001',
  commands: commands,
  devOnly: false,
  hiddenInHelp: false
}
